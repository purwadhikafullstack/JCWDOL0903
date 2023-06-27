"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stocks.belongsTo(models.Branch, {
        foreignKey: "branch_id",
      });

      Stocks.belongsTo(models.Products, {
        foreignKey: "product_id",
      });
    }
  }
  Stocks.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Stocks",
      paranoid: true,
    }
  );
  return Stocks;
};
