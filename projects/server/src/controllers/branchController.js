const db = require("../models");
const Branch = db.Branch;

module.exports = {
  getBranch: async (req, res) => {
    try {
      const data = await Branch.findAll();
      res.status(200).send({
        message: "Successfully get all users data",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  createBranch: async (req, res) => {
    try {
      const { name, kota, kecamatan, provinsi, kode_pos } = req.body;

      if (!name || !kota || !kecamatan || !provinsi || !kode_pos) {
        throw {
          message: "Please fill all required information",
        };
      }

      const newBranch = await Branch.create({
        name,
        kota,
        kecamatan,
        provinsi,
        kode_pos,
      });

      res.status(200).send({
        data: { newBranch },
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};