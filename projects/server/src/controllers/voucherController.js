const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { getValidVoucher } = require("../helpers/voucher");
const Voucher = db.Voucher;

async function getVouchers(req, res) {
  try {
    const itemsPerPage = 12;

    const page = parseInt(req.query.page);
    const voucherType = req.query.q;
    const productId = parseInt(req.query.productId);
    const sortType = req.query.sort;

    const sortMap = {
      name_asc: [[Sequelize.literal("CAST(voucher_type AS CHAR)"), "ASC"]],
      name_desc: [[Sequelize.literal("CAST(voucher_type AS CHAR)"), "DESC"]],
    };

    const offsetLimit = {};
    if (page) {
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }

    const productClause = productId ? { product_id: productId } : {};
    const voucherClause = voucherType ? { voucher_type: voucherType } : {};

    const vouchers = await Voucher.findAndCountAll({
      attributes: [
        "id",
        "voucher_type",
        "product_id",
        "amount",
        "percentage",
        "limit",
        "min_purchase",
      ],
      where: {
        ...productClause,
        ...voucherClause,
      },
      include: [
        {
          model: db.Products,
          attributes: ["id", "name", "image_url"],
        },
      ],
      ...offsetLimit,
      order: sortMap[sortType] || null,
    });

    return res.status(200).json({
      vouchers,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function createVoucher(req, res) {
  try {
    if (!(req.user.role === "admin" || req.user.role === "superadmin"))
      throw new Error("Unauthorized");

    const newVoucher = await getValidVoucher(req.body, "create");

    return res.status(201).json({
      voucher: newVoucher,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function updateVoucher(req, res) {
  try {
    if (!(req.user.role === "admin" || req.user.role === "superadmin"))
      throw new Error("Unauthorized");

    const voucherId = parseInt(req.params.id);
    req.body.voucherId = voucherId;

    const [isUpdated] = await getValidVoucher(req.body, "update");

    if (!isUpdated) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function deleteVoucher(req, res) {
  try {
    if (!(req.user.role === "admin" || req.user.role === "superadmin"))
      throw new Error("Unauthorized");

    const voucherId = parseInt(req.params.id);
    const isDeleted = await Voucher.destroy({
      where: {
        id: voucherId,
      },
    });

    if (!isDeleted) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
};
