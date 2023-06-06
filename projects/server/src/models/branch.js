'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Branch.belongsTo(models.Store, {
        foreignKey: {
          name: "store_id"
        }
      })
    }
  }
  Branch.init({
    name: DataTypes.STRING,
    store_id: DataTypes.INTEGER,
    kota: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kode_pos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Branch',
  });
  return Branch;
};