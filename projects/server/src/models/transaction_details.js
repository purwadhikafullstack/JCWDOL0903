'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction_Details.belongsTo(models.Transaction_Header, {
        foreignKey: "transaction_header_id"
      })

      Transaction_Details.belongsTo(models.Products, {
        foreignKey: "product_id"
      })
    }
  }
  Transaction_Details.init({
    transaction_header_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    product_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction_Details',
  });
  return Transaction_Details;
};