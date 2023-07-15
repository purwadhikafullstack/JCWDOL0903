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
        gender,
        birthdate,
      } = req.body;

      // console.log("gender", gender);
      if (
        !name ||
        !username ||
        !email ||
        !password ||
        !password_confirmation ||
        !phone_num ||
        !gender ||
        !birthdate ||
        gender === ". . ."
      )
        return res.status(400).send({
          message: "Please complete your data",
        });

      if (password !== password_confirmation)
        return res.status(400).send({
          message: "Password does not match",
        });

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;

      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          message:
            "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number",
        });
      }

      const userExist = await user.findOne({ where: { email } });

      if (userExist)
        throw {
          status: false,
          message: `Email is already exist`,
        };

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const result = await user.create({
        name,
        username,
        email,
        password: hashPassword,
        phone_num,
        gender,
        birthdate,
        referral_code: nanoid(),
      });

      const generateToken = nanoid(50);

      await db.Token.create({
        user_id: result.dataValues.id,
        token: generateToken,
        expired: moment().add(1, "days"),
        valid: true,
        status: "VERIFICATION",
      });

      let mail = {
        from: `Admin <${process.env.EMAIL}>`,
        to: `${email}`,
        subject: `Account Registration`,
        html: `<p> Click <a href="${process.env.WHITELISTED_DOMAIN}/verification/${generateToken}">here </a> to verify your account </p>`,
      };

      console.log("email nih", email);
      await nodemailer.sendMail(mail);

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
      const { token } = req.headers;

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

  resendVerification: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await db.User.findOne({
        where: {
          id: userId,
        },
      });

      const generateToken = nanoid(50);

      await db.Token.create({
        user_id: userId,
        token: generateToken,
        expired: moment().add(1, "days"),
        valid: true,
        status: "VERIFICATION",
      });

      let mail = {
        from: `Admin <${process.env.EMAIL}>`,
        to: `${user.dataValues.email}`,
        subject: `Account Registration`,
        html: `<p> Click <a href="${process.env.WHITELISTED_DOMAIN}/verification/${generateToken}">here </a> to verify your account </p>`,
      };

      await nodemailer.sendMail(mail);

      return res.status(200).send({ message: "success" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw "Please your complete data";

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

      const isvalid = await bcrypt.compare(password, userExist.password);
      if (!isvalid)
        throw {
          status: false,
          message: "Wrong password",
        };

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
        expired: moment().add(1, "days"),
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

      const userToken = await Token.findOne({
        where: {
          token,
          valid: true,
          expired: { [Op.gt]: moment() },
        },
      });
      const findUser = await user.findOne({
        where: {
          id: userToken.dataValues.user_id,
        },
      });

      delete findUser.dataValues.password;
      return res
        .status(200)
        .send({ message: "Success get User", user: findUser });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  forgotPass: async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log("req.body-reset", req.body);

      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      // console.log("ini user", user);
      if (!user)
        throw {
          status: false,
          message: "Sorry, we could not find your account.",
        };

      // console.log("ini id ya", user.dataValues.id);

      //  menjadi false dan forgotpassword

      const generateToken = nanoid();
      console.log("genarateToke", generateToken);
      const token = await db.Token.create({
        user_id: user.dataValues.id,
        token: generateToken,
        expired: moment().add(2, "day"),
        status: "FORGOT-PASSWORD",
      });

      console.log("ini toke after reset pass", token);

      let mail = {
        from: `Admin <${process.env.EMAIL}>`,
        to: `${user.dataValues.email}`,
        subject: `Reset Password`,
        html: `<p> Click <a href="${process.env.WHITELISTED_DOMAIN}/reset-password/${token.dataValues.token}">here </a> to verify your account </p>`,
      };
      await nodemailer.sendMail(mail);
      console.log("ini token", token);

      return res.send({ message: "Please check your email" });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  },

  requestReset: async (req, res) => {
    try {
      let token = req.headers.authorization;
      const { password, confirmPassword } = req.body;

      if (!password || !confirmPassword) {
        return res.status(400).send({
          message: "Please complete your data",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).send({
          message: "Passwords does not match",
        });
      }
      const tokenData = await db.Token.findOne({
        where: {
          token,
        },
      });
      const userId = tokenData.dataValues.user_id;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            user_id: userId,
            status: "FORGOT-PASSWORD",
          },
        }
      );

      return res.send({ message: "updated password" });
      // let token = req.headers.authorization;
    } catch (error) {
      // return res.status(400).json({ error: error.message });
      console.log(error);
    }
  },
  getByTokenForgotPass: async (req, res) => {
    try {
      const token = req.headers;
      console.log("getByTokenForgotPass", token);

      const dataToken = await db.Token.findOne({
        where: {
          token,
          expired: {
            [db.Sequelize.Op.gte]: moment().format,
          },
          valid: true,
        },
      });

      if (!dataToken) {
        throw new Error("Token has expired");
      }

      console.log("dataToke:", dataToken.dataValues);

      const user_id = dataToken.dataValues.user_id;
      const tokenId = dataToken.dataValues.id;

      // ...
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
