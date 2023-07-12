const db = require("../models");
const { Op } = require("sequelize");
const transHead = db.Transaction_Header;
const transDet = db.Transaction_Details;
const ORDER_STATUS = require("../constant/status");

async function updateTransaction(req, res) {
  try {
    const { status } = req.body;
    const transactionHeaderId = parseInt(req.params.id);

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

    let isUpdated;

    if (status === ORDER_STATUS.dikirim) {
      if (currStatus === status) return res.status(200).end();

      isUpdated = await transHead.update(
        {
          status,
        },
        {
          where: {
            id: transactionHeaderId,
          },
        }
      );
    } else if (status === ORDER_STATUS.konfirmasi) {
      if (currStatus === status) return res.status(200).end();

      isUpdated = await transHead.update(
        {
          status,
        },
        {
          where: {
            id: transactionHeaderId,
          },
        }
      );
    } else if (status === ORDER_STATUS.dibatalkan) {
      if (currStatus === status) return res.status(200).end();

      if (
        !(
          currStatus === ORDER_STATUS.menunggu_pembayaran ||
          currStatus === ORDER_STATUS.menunggu_konfirmasi ||
          currStatus === ORDER_STATUS.diproses
        )
      )
        throw new Error("Order cannot be canceled");

      isUpdated = await transHead.update(
        {
          status,
        },
        {
          where: {
            id: transactionHeaderId,
          },
        }
      );
    }

    if (!isUpdated || !isUpdated[0]) throw new Error("Status is not supported");
    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function createTransaction(req, res) {
  try {
    const { cart, selectedShippingOption, branch_id, invoice } = req.body;
    const user_id = req.params.id;
    const totalPrice = cart.reduce((total, product) => {
      return total + product.Product.price * product.qty;
    }, 0);

    const transactionHeader = await transHead.create({
      user_id,
      branch_id,
      user_voucher_id: null,
      expedition_id: 1,
      total_price: totalPrice,
      date: new Date(),
      status: "Menunggu Pembayaran",
      expedition_price: parseInt(selectedShippingOption),
      invoice,
    });

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
    res.status(200).send({
      message: "Transaction successfully created",
      data: {
        Transaction_Header: transactionHeader,
        Transaction_detail: newTransaction,
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
    const result = await transHead.update({status: ORDER_STATUS.konfirmasi},
      {where:{
        id
      }
    })

    res.status(200).send({
      message: "Transaction Finished",
      data: {
          result,
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

  const offsetLimit = {};
  if (page) {
    offsetLimit.limit = itemsPerPage;
    offsetLimit.offset = (page - 1) * itemsPerPage;
  }
  const branch_id = req.params.branchid;
  const sortMap = {
    invoice_asc: [["invoice", "ASC"]],
    invoice_desc: [["invoice", "DESC"]],
    date_asc: [["date", "ASC"]],
    date_desc: [["date", "DESC"]],
  };
  try {
    const result = await transHead.findAndCountAll({
      where: {
        branch_id,
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
        branch_id,
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

module.exports = {
  updateTransaction, createTransaction, getTransactionHead, confirmTransaction, getTransactionHeaders
};
