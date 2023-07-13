"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // stock_id one to many
      Products.belongsTo(models.Category, {
        foreignKey: "category_id",
      });
      Products.hasMany(models.Stocks, {
        foreignKey: "product_id",
      });
      Products.hasMany(models.Voucher, {
        foreignKey: "product_id",
      });
    }
  }
  Products.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: DataTypes.INTEGER,
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image_url: DataTypes.STRING,
      sold: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      desc: DataTypes.STRING(500),
    },
    {
      sequelize,
      modelName: "Products",
      paranoid: true,
    }
  );
  return Products;
};
