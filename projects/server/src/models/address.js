"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Address.init(
    {
      user_id: DataTypes.INTEGER,
      kota: DataTypes.STRING,
      provinsi: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kode_pos: DataTypes.STRING,
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
      is_main: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Address",
      paranoid: true,
    }
  );
  return Address;
};
