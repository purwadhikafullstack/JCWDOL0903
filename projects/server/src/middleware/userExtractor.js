const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

async function userExtractor(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Missing token");

    const userToken = await db.Token.findOne({
      where: {
        token,
        valid: true,
        expired: { [Op.gt]: moment() },
      },
    });
    if (!userToken) throw new Error("Token expired");

    const userExists = await db.User.findOne({
      where: {
        id: userToken.dataValues.user_id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
    });
    if (!userExists) throw new Error("User does not exist");

    req.user = userExists.dataValues;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

module.exports = userExtractor;
