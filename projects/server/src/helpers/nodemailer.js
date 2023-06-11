const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "banguninbang@gmail.com",
    pass: "xthgxbqsopajglfs",
  },
});

module.exports = transporter;
