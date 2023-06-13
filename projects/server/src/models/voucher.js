"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.belongsTo(models.Products, {
        foreignKey: "product_id",
      });
    }
  }
  Voucher.init(
    {
      voucher_type: DataTypes.ENUM(
        "Produk",
        "Total Belanja",
        "Gratis Ongkir",
        "Kode Referral"
      ),
      product_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      percentage: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Voucher",
      paranoid: true,
    }
  );
  return Voucher;
};
