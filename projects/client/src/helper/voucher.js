import api from "../api/api";

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

export { getProductDiscountAmount, checkUserReferralVoucher };
