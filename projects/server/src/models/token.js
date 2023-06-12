"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Token.belongsTo(models.User, {
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  Token.init(
    {
      user_id: DataTypes.INTEGER,
      token: {
        type: DataTypes.STRING,
      },
      expired: {
        type: DataTypes.DATE,
      },

      valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      status: {
        type: DataTypes.ENUM("LOGIN", "FORGOT-PASSWORD", "VERIFICATION"),
      },
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
