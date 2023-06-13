const db = require("../models");
const Voucher = db.Voucher;

async function getVouchers(req, res) {
  try {
    const vouchers = await Voucher.findAll({
      attributes: ["id", "voucher_type", "product_id", "amount", "percentage"],
    });
    return res.status(200).json({
      vouchers,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getVouchers,
};
