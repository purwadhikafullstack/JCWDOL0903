"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_Header extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Transaction_Header.hasMany(models.Transaction_Details, {
        foreignKey: "transaction_header_id",
      });

      Transaction_Header.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      Transaction_Header.belongsTo(models.Branch, {
        foreignKey: "branch_id",
      });

      Transaction_Header.belongsTo(models.Users_Voucher, {
        foreignKey: "user_voucher_id",
      });

      Transaction_Header.belongsTo(models.Expedition, {
        foreignKey: "expedition_id",
      });
    }
  }
  Transaction_Header.init(
    {
      user_id: DataTypes.INTEGER,
      branch_id: DataTypes.INTEGER,
      user_voucher_id: DataTypes.INTEGER,
      expedition_id: DataTypes.INTEGER,
      invoice: DataTypes.STRING,
      total_price: DataTypes.INTEGER,
      date: DataTypes.DATE,
      status: DataTypes.ENUM(
        "Menunggu Pembayaran",
        "Menunggu Konfirmasi Pembayaran",
        "Diproses",
        "Dikirim",
        "Pesanan Dikonfirmasi",
        "Dibatalkan"
      ),
      expedition_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction_Header",
    }
  );
  return Transaction_Header;
};
