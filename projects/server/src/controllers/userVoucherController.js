const moment = require("moment");
const db = require("../models");
const { Op } = require("sequelize");
const UsersVoucher = db.Users_Voucher;

async function getUserVouchers(req, res) {
  try {
    const { voucherType, userId } = req.query;

    const voucherClause = voucherType ? { voucher_type: voucherType } : {};
    const userClause = userId ? { user_id: parseInt(userId) } : {};

    const vouchers = await UsersVoucher.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        ...userClause,
      },
      include: [
        {
          model: db.Voucher,
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          where: {
            ...voucherClause,
          },
        },
      ],
    });

    return res.status(200).json({
      vouchers,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function createUserVoucher(req, res) {
  try {
    if (req.user.role === "admin" || req.user.role === "superadmin")
      throw new Error("Admin / Super Admin cannot redeem voucher");
    const userId = req.user.id;
    const { referral_code = null } = req.body;

    let newUserVoucher;

    if (referral_code) {
      const isReferralCodeValid = await db.User.findOne({
        where: {
          referral_code,
          id: {
            [Op.not]: userId,
          },
        },
      });
      if (!isReferralCodeValid) throw new Error("User referral code invalid");

      const isReferralVoucherExist = await db.Voucher.findOne({
        where: {
          voucher_type: "Kode Referral",
        },
      });
      if (!isReferralVoucherExist)
        throw new Error("Referral Code voucher doesn't exist");

      const userHasReferralVoucher = await UsersVoucher.findOne({
        where: {
          user_id: userId,
        },
        include: {
          model: db.Voucher,
          where: {
            voucher_type: "Kode Referral",
          },
        },
      });
      if (userHasReferralVoucher)
        throw new Error("Can't claim referral voucher anymore");

      newUserVoucher = await UsersVoucher.create({
        voucher_id: isReferralVoucherExist.dataValues.id,
        user_id: userId,
        expired_date: moment().add(7, "days"),
        is_active: 1,
      });
    }

    if (!newUserVoucher) throw new Error("Required field cannot be empty");
    return res.status(201).json({
      voucher: newUserVoucher,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getUserVouchers,
  createUserVoucher,
};
