const db = require("../models");
const { Op, fn, literal } = require("sequelize");
const ORDER_STATUS = require("../constant/status");

async function confirmTransactionsAfter7D() {
  await db.Transaction_Header.update(
    { status: ORDER_STATUS.konfirmasi },
    {
      where: {
        status: ORDER_STATUS.dikirim,
        date: {
          [Op.lt]: fn(
            "DATE_SUB",
            literal("CURDATE()"),
            literal("INTERVAL 7 DAY")
          ),
        },
      },
    }
  );
}

module.exports = { confirmTransactionsAfter7D };
