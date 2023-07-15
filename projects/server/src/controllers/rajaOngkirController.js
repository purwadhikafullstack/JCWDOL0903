const axios = require("axios");
const FormData = require("form-data");

module.exports = {
  getProvince: async (req, res) => {
    try {
      const response = await axios.get(
        "https://api.wilayah-nusantara.id/provinsi",
        { params: { limit: 100 } }
      );
      const data = response.data;
      res.status(200).send({
        message: "Successfully get province",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getCity: async (req, res) => {
    try {
      const { provinsiCode } = req.body;
      const response = await axios.get(
        "https://api.wilayah-nusantara.id/kabupaten",
        {
          params: {
            provinsiCode,
          },
        }
      );
      const data = response.data;
      res.status(200).send({
        message: "Successfully get city",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getRajCity: async (req, res) => {
    try {
      const response = await axios.get(
        "https://api.rajaongkir.com/starter/city",
        {
          headers: {
            key: process.env.RAJA_ONGKIR_KEY,
          },
        }
      );
      const data = response.data;
      res.status(200).send({
        message: "Successfully get city",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getKecamatan: async (req, res) => {
    try {
      const { kabkotCode } = req.body;
      const response = await axios.get(
        "https://api.wilayah-nusantara.id/kecamatan",
        {
          params: {
            kabkotCode,
          },
        }
      );
      const data = response.data;
      res.status(200).send({
        message: "Successfully get kecamatan",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getOngkir: async (req, res) => {
    try {
      const origin = req.body.origin;
      const destination = req.body.destination;
      const weight = req.body.weight;
      const courier = req.body.courier;

      // const origin = 501;
      // const destination = 498;
      // const weight = 1700;
      // const courier = "jne";

      const response = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        {
          origin,
          destination,
          weight,
          courier,
        },
        {
          headers: {
            key: process.env.RAJA_ONGKIR_KEY,
          },
        }
      );

      // Handle the response here
      console.log(response.data);
      res.status(200).send(response.data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
