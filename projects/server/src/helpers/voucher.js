const db = require("../models");

const voucherTypes = [
  "Produk",
  "Total Belanja",
  "Gratis Ongkir",
  "Kode Referral",
  "Buy One Get One",
];

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
  cb
) {
  if (!voucher_type) throw new Error("Voucher type field cannot be empty");
  if (!voucherTypes.includes(voucher_type))
    throw new Error("Invalid Voucher Type");
  if (!amount && !percentage && voucher_type !== "Buy One Get One")
    throw new Error("Amount / Percentage field cannot be empty");
  if ((amount && percentage) || (amount && limit))
    throw new Error("Voucher must be either nominal or percentage");
  if (percentage && !limit) throw new Error("Limit field cannot be empty");

  product_id =
    voucher_type === "Produk" || voucher_type === "Buy One Get One"
      ? parseInt(product_id)
      : null;
  amount = parseInt(amount) || null;
  percentage = parseInt(percentage);
  percentage = percentage ? (percentage > 100 ? 100 : percentage) : null;
  limit = parseInt(limit) || null;
  min_purchase = parseInt(min_purchase) || null;

  const voucherClause = voucherId ? { id: voucherId } : {};

  if (voucher_type === "Produk") {
    if (!product_id) throw new Error("Product ID field cannot be empty");
  } else if (voucher_type === "Buy One Get One") {
    if (!product_id) throw new Error("Product ID field cannot be empty");
  } else if (voucher_type === "Total Belanja") {
    if (!min_purchase)
      throw new Error("Minimum Purchase field cannot be empty");
  }

  const result = await cb(
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

  return result;
}
// async function getValidVoucher(
//   {
//     voucher_type,
//     product_id,
//     amount,
//     percentage,
//     limit,
//     min_purchase,
//     voucherId,
//   },
//   cb
// ) {
//   if (!voucher_type) throw new Error("Voucher type field cannot be empty");
//   if (!voucherTypes.includes(voucher_type))
//     throw new Error("Invalid Voucher Type");
//   if (!amount && !percentage && voucher_type !== "Buy One Get One")
//     throw new Error("Amount / Percentage field cannot be empty");
//   if ((amount && percentage) || (amount && limit))
//     throw new Error("Voucher must be either nominal or percentage");
//   if (percentage && !limit) throw new Error("Limit field cannot be empty");

//   product_id = product_id || null;
//   amount = amount || null;
//   percentage = percentage || null;
//   limit = limit || null;
//   min_purchase = min_purchase || null;

//   const voucherClause = voucherId ? { id: voucherId } : {};

//   let result;
//   if (voucher_type === "Produk") {
//     if (!product_id) throw new Error("Product ID field cannot be empty");
//     result = await cb(
//       {
//         voucher_type,
//         product_id,
//         amount,
//         percentage,
//         limit,
//       },
//       {
//         where: {
//           ...voucherClause,
//         },
//       }
//     );
//   } else if (voucher_type === "Buy One Get One") {
//     if (!product_id) throw new Error("Product ID field cannot be empty");
//     result = await cb(
//       {
//         voucher_type,
//         product_id,
//       },
//       {
//         where: {
//           ...voucherClause,
//         },
//       }
//     );
//   } else if (voucher_type === "Total Belanja") {
//     if (!min_purchase)
//       throw new Error("Minimum Purchase field cannot be empty");
//     result = await cb(
//       {
//         voucher_type,
//         amount,
//         percentage,
//         limit,
//         min_purchase,
//       },
//       {
//         where: {
//           ...voucherClause,
//         },
//       }
//     );
//   } else {
//     result = await cb(
//       {
//         voucher_type,
//         amount,
//         percentage,
//         limit,
//       },
//       {
//         where: {
//           ...voucherClause,
//         },
//       }
//     );
//   }

//   return result;
// }

module.exports = { getValidVoucher };
