const db = require("../models");
const { Op } = require("sequelize");
const transHead = db.Transaction_Header;
const transDet = db.Transaction_Details
const product = db.Products

async function updateTransaction(req, res) {
  try {
    if (
      !(req.user.role === "admin" || req.user.role === "superadmin") ||
      status === "Pesanan Dikonfirmasi"
    )
      throw new Error("Unauthorized");

    const transactionHeaderId = parseInt(req.params.id);
    const { status } = req.body;

    const isTransactionExist = await TransactionHeader.findOne({
      where: {
        id: transactionHeaderId,
      },
    });
    if (!isTransactionExist) throw new Error("Transaction not found");

    let isUpdated;

    if (status === "Dikirim") {
      isUpdated = await TransactionHeader.update(
        {
          status: "Dikirim",
        },
        {
          where: {
            id: transactionHeaderId,
          },
        }
      );
    }

    if (status === "Pesanan Dikonfirmasi") {
      isUpdated = await TransactionHeader.update(
        {
          status: "Pesanan Dikonfirmasi",
        },
        {
          where: {
            id: transactionHeaderId,
          },
        }
      );
    }

    if (status === "Dibatalkan") {
      const currStatus = isTransactionExist.dataValues.status;
      if (
        currStatus !== "Menunggu Pembayaran" ||
        currStatus !== "Menunggu Konfirmasi Pembayaran" ||
        currStatus !== "Diproses"
      )
        throw new Error("Order cannot be canceled");

      isUpdated = await TransactionHeader.update(
        {
          status: "Dibatalkan",
        },
        {
          where: {
            id: transactionHeaderId,
          },
        }
      );
    }

    if (!isUpdated[0]) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function createTransaction  (req, res)  {
  try{
      const { cart, selectedShippingOption, branch_id, invoice } = req.body
      const user_id = req.params.id
      const totalPrice = cart.reduce((total, product) => {
          return total + product.Product.price * product.qty
      }, 0) 

      const transactionHeader = await  transHead.create({
          user_id,
          branch_id,
          user_voucher_id: null,
          expedition_id: 1,
          total_price: totalPrice,
          date: new Date(),
          status: "Menunggu Pembayaran",
          expedition_price: parseInt(selectedShippingOption),
          invoice
      })

      const newTransaction = await transDet.bulkCreate(
          cart.map((product) => {
              return{
                  transaction_header_id: transactionHeader.id,
                  product_id: product.product_id,
                  qty: product.qty,
                  product_name: product.Product.name,
                  product_price: product.Product.price,
              }
          })
      )
      res.status(200).send({
          message: "Transaction successfully created",
          data: {
              Transaction_Header: transactionHeader,
              Transaction_detail: newTransaction,
          },
          });
  }catch (err){
      console.log(err);
      res.status(400).send(err);
  }
}

async function getTransactionHead(req, res) {
  const page = parseInt(req.query.page);
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  const sortType = req.query.sort
  const itemsPerPage = 3
  const status = req.query.status
  const statusClause = status? {status: status} : {};
  const invoiceName = req.query.q
  const invoiceClause = invoiceName? {invoice: {[Op.like]: "%" + invoiceName +"%"}} : {}
  const dateClause = (startDate == "undefined" && endDate == "undefined") ? {} : {date: {[Op.between]: [startDate, endDate]}}  

  const offsetLimit = {};
    if (page) {
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }
  const user_id = req.params.id;
  const sortMap = {
    invoice_asc: [["invoice", "ASC"]],
    invoice_desc: [["invoice", "DESC"]],
    date_asc: [["date", "ASC"]],
    date_desc: [["date", "DESC"]],
  };
  try {
    const result = await transHead.findAndCountAll({   
      where: {
        user_id,
        ...statusClause,
        ...invoiceClause,
        ...dateClause   
      },
      include: [
        {
          model: db.Transaction_Details,
          attributes: ["product_name", "qty"],
          include: [
            {
              model: db.Products,
              attributes: ["image_url", "price"],
            },
          ],
        },
      ],
      ...offsetLimit,
      order: sortMap[sortType] || null
    });
    const results = await transHead.findAndCountAll({
      where:{
        user_id,
        ...statusClause,
        ...invoiceClause,
        ...dateClause
       
      }
    })
    res.status(200).send({
      message: "Successfully fetch user transaction headers",
      data: {
        Transaction_Header: result,
        count: results
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports = {
  updateTransaction, createTransaction, getTransactionHead
};