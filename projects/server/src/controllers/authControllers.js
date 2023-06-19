const db = require("../models");
const bcrypt = require("bcrypt");
const user = db.User;
const moment = require("moment");
const { nanoid } = require("nanoid");
const nodemailer = require("../helpers/nodemailer");
const { Op } = require("sequelize");

// Import model Token
const Token = db.Token;

module.exports = {
  register: async (req, res) => {
    try {
      const {
        name,
        username,
        email,
        password,
        password_confirmation,
        phone_num,
      } = req.body;

      console.log(req.body);

      if (
        !name ||
        !username ||
        !email ||
        !password ||
        !password_confirmation ||
        !phone_num
      )
        throw "Please complete your data";

      if (password !== password_confirmation) throw "Password does not match";

      const userExist = await user.findOne({
        where: {
          email,
        },
      });

      if (userExist)
        throw {
          status: false,
          message: `Email is already exist`,
        };

      const salt = await bcrypt.genSalt(10);
      // console.log(salt);
      const hashPash = await bcrypt.hash(password, salt);
      // console.log(hashPash);

      const result = await user.create({
        name,
        username,
        email,
        password: hashPash,
        phone_num,
      });
      const generateToken = nanoid(50);

      const token = await db.Token.create({
        user_id: result.dataValues.id,
        token: generateToken,
        expired: moment().add(1, "days"), //2023-06-08
        valid: true,
        status: "VERIFICATION",
      });

      let mail = {
        from: `Admin <banguninbang@gmail.com>`,
        to: `${email}`,
        subject: `Account Registration`,
        html: `<p> Click <a href="http://localhost:3000/verification/${generateToken}">here </a> to verify your account </p>`,
      };

      let response = await nodemailer.sendMail(mail);

      console.log(`${response}`);
      return res.status(200).send({
        data: result,
        message: "register Succesfully",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  verify: async (req, res) => {
    try {
      const { token } = req.body;

      const data = await Token.findOne({
        where: {
          token,
          valid: true,
          expired: { [Op.gt]: moment() },
          status: "VERIFICATION",
        },
      });
      if (!data) {
        return res.status(400).send({
          message: "Token Invalid",
        });
      }

      const userId = data.dataValues.user_id;
      const tokenId = data.dataValues.id;

      await user.update(
        {
          isVerified: true,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      await Token.update(
        {
          valid: false,
        },
        {
          where: {
            id: tokenId,
          },
        }
      );
      return res.status(200).send({ message: "Verified" });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw "Please your complete data";

      // select from where
      const userExist = await user.findOne({
        where: {
          email,
        },
        include: [{ model: db.Branch }],
      });

      if (!userExist)
        throw {
          status: false,
          message: "User not found",
        };

      //mengcompare password yang diinput dengan password yang ada di database
      const isvalid = await bcrypt.compare(password, userExist.password);
      if (!isvalid)
        throw {
          status: false,
          message: "Wrong password",
        };

      // const payload = {
      //   id: userExist.id,
      //   isadmin: userExist.isadmin,
      //   is_branch: userExist,
      // };

      // console.log("payload", payload);

      const generateToken = nanoid(50);

      await db.Token.update(
        {
          valid: false,
        },
        {
          where: { user_id: userExist.dataValues.id },
        }
      );

      const token = await db.Token.create({
        user_id: userExist.dataValues.id,
        token: generateToken,
        expired: moment().add(1, "days"), //2023-06-08
        valid: true,
        status: "LOGIN",
      });

      delete userExist.dataValues.password;
      res.send({
        message: "Login Success",
        result: { user: userExist, token },
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getUserByToken: async (req, res) => {
    try {
      const { token } = req.params;

      //const token = select userId from tokens where token = token
      // select * from users where id = userId

      const userToken = await Token.findOne({
        where: {
          token,
          valid: true,
          expired: { [Op.gt]: moment() },
        },
      });
      console.log(userToken);

      const findUser = await user.findOne({
        where: {
          id: userToken.dataValues.user_id,
        },
      });

      console.log(findUser);
      delete findUser.dataValues.password;
      return res
        .status(200)
        .send({ message: "Success get User", user: findUser });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
};
