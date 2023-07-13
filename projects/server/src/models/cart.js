"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1 cart belongs to many product
      Cart.belongsTo(models.Products, {
        foreignKey: "product_id",
      });

      Cart.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Cart.init(
    {
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
