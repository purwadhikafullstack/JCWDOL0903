import api from "../api/api";

async function checkUserReferralVoucher(userId = 0) {
  if (!userId) throw new Error("Please log in first");
  const res = await api.get(
    `user-vouchers?userId=${userId}&voucherType=Kode Referral`
  );
  return Boolean(res.data.vouchers.count);
}

export { checkUserReferralVoucher };
