const db = require("../models");
const { Op } = require("sequelize");
const TransactionHeader = db.Transaction_Header;

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

module.exports = {
  updateTransaction,
};
