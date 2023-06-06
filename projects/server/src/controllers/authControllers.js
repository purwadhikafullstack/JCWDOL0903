const db = require("../models");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, password_confirmation, phone_number } =
        req.body;

      if (!name || !email || !password || !phone_number)
        throw "Please complete your data";

      if (password !== password_confirmation) throw "Password does not match";
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
    } catch (err) {}
  },
};
