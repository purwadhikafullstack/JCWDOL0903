const db = require("../models");
const { Op } = require("sequelize");

const VOUCHER_TYPES = require("../constant/voucher");

async function getValidVoucher(
  {
    voucher_type,
    product_id,
    amount,
    percentage,
    limit,
    min_purchase,
    voucherId,
  },
  action
) {
  if (!(action === "create" || action === "update"))
    throw new Error("Invalid action");
  if (!voucher_type) throw new Error("Voucher type field cannot be empty");
  if (!Object.values(VOUCHER_TYPES).includes(voucher_type))
    throw new Error("Invalid Voucher Type");
  if (!amount && !percentage && voucher_type !== VOUCHER_TYPES.buy1_get1)
    throw new Error("Amount / Percentage field cannot be empty");
  if ((amount && percentage) || (amount && limit))
    throw new Error("Voucher must be either nominal or percentage");
  if (percentage && !limit) throw new Error("Limit field cannot be empty");

  product_id =
    voucher_type === VOUCHER_TYPES.produk ||
    voucher_type === VOUCHER_TYPES.buy1_get1
      ? parseInt(product_id)
      : null;
  amount = parseInt(amount) || null;
  percentage = parseInt(percentage);
  percentage = percentage ? (percentage > 100 ? 100 : percentage) : null;
  limit = parseInt(limit) || null;
  min_purchase = parseInt(min_purchase) || null;

  if (
    voucher_type === VOUCHER_TYPES.produk ||
    voucher_type === VOUCHER_TYPES.buy1_get1
  ) {
    if (!product_id) throw new Error("Product ID field cannot be empty");
  } else if (voucher_type === VOUCHER_TYPES.total_belanja) {
    if (!min_purchase)
      throw new Error("Minimum Purchase field cannot be empty");
  }

  const voucherClause = voucherId ? { id: voucherId } : {};
  const productClause = product_id ? { product_id } : {};

  let result;
  if (action === "create") {
    const isVoucherExist = await db.Voucher.findOne({
      where: { voucher_type, ...productClause },
    });
    if (isVoucherExist) throw new Error("Voucher already exists");
    result = await db.Voucher.create({
      voucher_type,
      product_id,
      amount,
      percentage,
      limit,
      min_purchase,
    });
  } else if (action === "update") {
    const isVoucherExist = await db.Voucher.findOne({
      where: { voucher_type, ...productClause, id: { [Op.not]: voucherId } },
    });

    if (isVoucherExist) throw new Error("Voucher already exists");
    result = await db.Voucher.update(
      {
        voucher_type,
        product_id,
        amount,
        percentage,
        limit,
        min_purchase,
      },
      {
        where: {
          ...voucherClause,
        },
      }
    );
  }

  return result;
}

module.exports = { getValidVoucher };
