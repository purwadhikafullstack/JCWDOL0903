import api from "../api/api";

function getVoucherFormData(data) {
  const {
    "voucher_type[value]": voucher_type,
    amountPercentage,
    unit,
    limit,
    product_id,
    min_purchase,
  } = data;

  const amountOrPercentage = {};
  if (unit?.value === "nominal") {
    amountOrPercentage.amount = amountPercentage?.value;
    amountOrPercentage.percentage = null;
  } else if (unit?.value === "percentage") {
    amountOrPercentage.percentage = amountPercentage?.value;
    amountOrPercentage.amount = null;
  }

  return {
    voucher_type: voucher_type?.value,
    ...amountOrPercentage,
    limit: limit?.value,
    product_id: product_id?.value,
    min_purchase: min_purchase?.value,
  };
}

function getProductDiscountAmount(productVouchers = []) {
  const productVoucher = productVouchers.find(
    (v) => v.voucher_type === "Produk"
  );
  return productVoucher?.amount || productVoucher?.limit || 0;
}

async function checkUserReferralVoucher(userId = 0) {
  if (!userId) throw new Error("Please log in first");
  const res = await api.get(
    `user-vouchers?userId=${userId}&voucherType=Kode Referral`
  );
  return Boolean(res.data.vouchers.count);
}

export {
  getVoucherFormData,
  getProductDiscountAmount,
  checkUserReferralVoucher,
};
