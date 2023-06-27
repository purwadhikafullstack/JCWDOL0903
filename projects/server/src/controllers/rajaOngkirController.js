
const axios = require("axios")

module.exports = {
    getProvince: async (req, res) => {
        try{
            const response = await axios.get("https://api.rajaongkir.com/starter/province",{headers:{key:process.env.RAJA_ONGKIR_KEY}})
            const data = response.data;
            res.status(200).send({
                message: "Successfully get province",
                data
              })
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
          }
        
    },

    getCity: async (req, res) => {
        try {
          const { province } = req.body;
          const response = await axios.get("https://api.rajaongkir.com/starter/city", {
            headers: {
              key: process.env.RAJA_ONGKIR_KEY
            },
            params: {
              province
            }
          });
          const data = response.data;
          // console.log(data);
          res.status(200).send({
            message: "Successfully get city",
            data
          });
        } catch (err) {
          console.log(err);
          res.status(400).send(err);
        }
      }
      
      
}