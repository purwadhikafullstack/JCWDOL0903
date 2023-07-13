"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock_History.belongsTo(models.Stocks, {
        foreignKey: "stock_id",
      });
      Stock_History.belongsTo(models.Transaction_Header, {
        foreignKey: "transaction_header_id",
      });
    }
  }
  Stock_History.init(
    {
      stock_id: DataTypes.INTEGER,
      status: DataTypes.ENUM("IN", "OUT"),
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transaction_header_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Stock_History",
    }
  );
  return Stock_History;
};
