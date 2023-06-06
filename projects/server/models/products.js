'use strict';
const {
  Model
} = require('sequelize');
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
        foreignKey: "category_id"
      })
    }
  }
  Products.init({
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    image_url: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN,
    stock_id: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};