"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users_Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users_Voucher.belongsTo(models.Voucher, {
        foreignKey: "voucher_id",
      });
    }
  }
  Users_Voucher.init(
    {
      voucher_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      expired_date: DataTypes.DATE,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Users_Voucher",
    }
  );
  return Users_Voucher;
};
