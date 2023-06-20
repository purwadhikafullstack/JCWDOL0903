"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Branch, {
        foreignKey: {
          name: "branch_id",
        },
      });
    }
  }
  User.init(
    {
      branch_id: DataTypes.INTEGER,
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_num: DataTypes.STRING,
      gender: DataTypes.ENUM("Man", "Woman"),
      birthdate: DataTypes.DATE,
      profile_picture: DataTypes.STRING,
      referal_code: DataTypes.STRING,
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        // allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "admin", "superadmin"),
        defaultValue: "user",
        allowNull: false,
      },
      // is_admin: DataTypes.BOOLEAN,
      // is_branch: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "User",
      // timestamps: false,
      paranoid: true,
    }
  );
  return User;
};
