const bcrypt = require("bcrypt");
const db = require("../models");
const { Op } = require("sequelize");
const nodemailer = require("../helpers/nodemailer");

module.exports = {
  getAllBranch: async (req, res) => {
    try {
      const data = await db.Branch.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      });

      res.status(200).send({
        status: true,
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  },
  addBranchAdmin: async (req, res) => {
    try {
      const { email, password, name } = req.body;

      console.log("ini bodybro", req.body);

      if (!email || !password || !name || name === ". . .")
        return res.status(400).send({
          message: "Please complete your data",
        });

      const user = await db.User.findOne({ where: { email } });

      if (user)
        return res.status(400).send({ message: "Email is already exist" });

      // cek brachh untuk ambil id
      const branch = await db.Branch.findOne({
        where: { name },
      });

      console.log("branch nih", branch);
      const branchId = branch.dataValues.id;

      const salt = await bcrypt.genSalt(10);
      const hassPass = await bcrypt.hash(password, salt);

      await db.User.create({
        branch_id: branchId,
        email: email,
        role: "admin",
        isVerified: true,
        password: hassPass,
      });

      let mail = {
        from: `Admin <banguninbang@gmail.com>`,
        to: `${email}`,
        subject: `Admiin Registration`,
        html: `<p> Click <a href="http://localhost:3000">here </a> Password ${password} </p>`,
      };

      await nodemailer.sendMail(mail);

      return res.status(200).send({ message: "Admin added successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  fetchAllAdminBranch: async (req, res) => {
    try {
      const data = await db.Branch.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        // join
        include: [
          {
            model: db.User,
            where: { role: "admin" },
            attributes: {
              exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });

      console.log("fetchAllDataAdmin", data);

      res.status(200).send({
        status: true,
        data,
      });
    } catch (error) {
      console.log("ini nih error", error);
      res.status(400).send(error);
    }
  },
};

/*
login diawal aja

super admin nembak role

super admin bisa merubah user biasa menjadi admin branch
*/

/**
 * 27-062023
 * regis admin=  email dan password
//  all data = semua data transaksi percategory
 */
