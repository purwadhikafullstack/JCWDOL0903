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
      voucher_type: {
        type: DataTypes.ENUM(
          "Produk",
          "Total Belanja",
          "Gratis Ongkir",
          "Kode Referral",
          "Buy One Get One"
        ),
        allowNull: false,
      },
      product_id: DataTypes.INTEGER,
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      percentage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      limit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      min_purchase: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Voucher",
      paranoid: true,
    }
  );
  return Voucher;
};
