const db = require("../models");
const { Op } = require("sequelize");
const transHead = db.Transaction_Header;
const transDet = db.Transaction_Details;
const ORDER_STATUS = require("../constant/status");
const moment = require("moment");

async function updateTransaction(req, res) {
  try {
    const { status } = req.body;
    const transactionHeaderId = parseInt(req.params.id);
    if (!Object.values(ORDER_STATUS).includes(status))
      throw new Error("Status not supported");
    
    if (
      !(req.user.role === "admin" || req.user.role === "superadmin") &&
      !(
        status === ORDER_STATUS.konfirmasi || status === ORDER_STATUS.dibatalkan
      )
    )
      throw new Error("Unauthorized");

    const isTransactionExist = await transHead.findOne({
      where: {
        id: transactionHeaderId,
      },
    });
    if (!isTransactionExist) throw new Error("Transaction not found");

    const currStatus = isTransactionExist.dataValues.status;
    if (currStatus === status) return res.status(200).end();

    if (status === ORDER_STATUS.dibatalkan) {
      if (
        ![
          ORDER_STATUS.menunggu_pembayaran,
          ORDER_STATUS.menunggu_konfirmasi,
          ORDER_STATUS.diproses,
        ].includes(currStatus)
      )
        throw new Error("Order cannot be canceled");
    }
    
    const [isUpdated] = await transHead.update(
      { status },
      {
        where: { id: transactionHeaderId },
      }
    );

    if (!isUpdated) throw new Error("Status is not supported");

    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function createTransaction(req, res) {
  try {
    const { cart, selectedShippingOption, branch_id, invoice, user_voucher_id } = req.body;
    const user_id = req.params.id;
    const totalPrice = cart.reduce((total, product) => {
      return total + product.Product.price * product.qty;
    }, 0);

    // console.log("ini users voucher", ...user_voucher_id)
    const transactionHeader = await transHead.create({
      user_id,
      branch_id,
      user_voucher_id: user_voucher_id? user_voucher_id : null,
      expedition_id: 1,
      total_price: totalPrice,
      date: new Date(),
      status: "Menunggu Pembayaran",
      expedition_price: parseInt(selectedShippingOption),
      invoice,
    });

    if(user_voucher_id){
      await db.Users_Voucher.update({is_active: 0}, 
        {
          where:{
            id: user_voucher_id
          }
        })
    } 

    const newTransaction = await transDet.bulkCreate(
      cart.map((product) => {
        return {
          transaction_header_id: transactionHeader.id,
          product_id: product.product_id,
          qty: product.qty,
          product_name: product.Product.name,
          product_price: product.Product.price,
        };
      })
    );

    const stocks = cart.map(async (product) => {
      const currentStock = await db.Stocks.findOne({
        where: {
          product_id: product.product_id,
          branch_id: product.Product.Stocks[0].Branch.id,
        },
      });

      const currentSoldProducts = await db.Products.findOne({
        where:{
          id: product.product_id
        }
      })
      
      const updatedSoldProducts = currentSoldProducts.sold + product.qty
      const updatedStock = currentStock.stock - product.qty;
      
      await db.Products.update({sold: updatedSoldProducts},
        {
          where: {
            id: product.product_id
          }
        })

      await db.Stock_History.create(
        {
          status: "OUT",
          qty:product.qty,
          stock_id:product.Product.Stocks[0].id,
          transaction_header_id: transactionHeader.id
        }
       )
    
      await db.Stocks.update(
        {
          stock: updatedStock,
        },
        {
          where: {
            product_id: product.product_id,
            branch_id: product.branch_id,
          },
        }
      );
    });
    
    
    res.status(200).send({
      message: "Transaction successfully created",
      data: {
        Transaction_Header: transactionHeader,
        Transaction_detail: newTransaction,
        Stock_Update: stocks
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function confirmTransaction  (req, res) {
  try{
    const id  = req.params.id
    const {user_id} = req.body
    const result = await transHead.update({status: ORDER_STATUS.konfirmasi},
      {where:{
        id
      }
    })

    const giveVoucher = await transHead.findOne({
      where:{
        id
      }
    })

    const giveOngkirVoucher = await transHead.findAndCountAll({
      where:{
        user_id
      }
    })

    if(giveOngkirVoucher.count % 3 === 0){
      await db.Users_Voucher.create({
        voucher_id: 3,
        user_id,
        expired_date: moment().add(7, "days"), 
        is_active: 1
      })
    }
   
    if(giveVoucher.total_price > 1000000){
      await db.Users_Voucher.create({voucher_id: 7, user_id: giveVoucher.user_id, expired_date: moment().add(7, "days"), is_active: 1})
    }


    res.status(200).send({
      message: "Transaction Finished",
      data: {
          result,
          giveVoucher
      },
      });
  }catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}



async function getTransactionHead(req, res) {
  const page = parseInt(req.query.page);
  const startDate = req.query.startDate === "undefined" ? null : req.query.startDate
  const endDate = req.query.endDate === "undefined" ? null : req.query.endDate
  const sortType = req.query.sort
  const itemsPerPage = 3
  const status = req.query.status
  const statusClause = status? {status: status} : {};
  const invoiceName = req.query.q
  const invoiceClause = invoiceName? {invoice: {[Op.like]: "%" + invoiceName +"%"}} : {}
  const dateClause = (!startDate  && !endDate ) ? {} : {date: {[Op.between]: [startDate, endDate]}}  

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
        ...dateClause,
      },
      include: [
        {
          model: db.Transaction_Details,
          attributes: ["product_name", "qty"],
          include: [
            {
              model: db.Products,
              attributes: ["image_url", "price","id"],
            },
          ],
        },
        {
          model: db.Branch,
          attributes: ["name", "kota", "id"],
        },
      ],
      ...offsetLimit,
      order: sortMap[sortType] || null,
    });
    const results = await transHead.findAndCountAll({
      where: {
        user_id,
        ...statusClause,
        ...invoiceClause,
        ...dateClause,
      },
    });
    res.status(200).send({
      message: "Successfully fetch user transaction headers",
      data: {
        Transaction_Header: result,
        count: results,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getTransactionHeaders(req, res) {
  const page = parseInt(req.query.page);
  const startDate = req.query.startDate === "undefined" ? null : req.query.startDate
  const endDate = req.query.endDate === "undefined" ? null : req.query.endDate
  const sortType = req.query.sort
  const itemsPerPage = 3
  const status = req.query.status
  const statusClause = status? {status: status} : {};
  const invoiceName = req.query.q
  const invoiceClause = invoiceName? {invoice: {[Op.like]: "%" + invoiceName +"%"}} : {}
  const dateClause = (!startDate  && !endDate ) ? {} : {date: {[Op.between]: [startDate, endDate]}}
  const branch_id = req.body.branch_id ? {branch_id: req.body.branch_id} : {}
  const offsetLimit = {};
  if (page) {
    offsetLimit.limit = itemsPerPage;
    offsetLimit.offset = (page - 1) * itemsPerPage;
  }
  req.params.branchid;
  const sortMap = {
    invoice_asc: [["invoice", "ASC"]],
    invoice_desc: [["invoice", "DESC"]],
    date_asc: [["date", "ASC"]],
    date_desc: [["date", "DESC"]],
  };
  try {
    const result = await transHead.findAndCountAll({
      where: {
        ...branch_id,
        ...statusClause,
        ...invoiceClause,
        ...dateClause,
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
        {
          model: db.Branch,
          attributes: ["name", "kota"],
        },
      ],
      ...offsetLimit,
      order: sortMap[sortType] || null,
    });
    const results = await transHead.findAndCountAll({
      where: {
        ...branch_id,
        ...statusClause,
        ...invoiceClause,
        ...dateClause,
      },    
    });
    res.status(200).send({
      message: "Successfully fetch user transaction headers",
      data: {
        Transaction_Header: result,
        count: results,
      },
    });
    console.log("ini result",result)
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports = {
  updateTransaction, createTransaction, getTransactionHead, confirmTransaction, getTransactionHeaders
};
