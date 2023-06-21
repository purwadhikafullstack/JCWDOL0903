// const db = require('../models')
// const User = db.User
// const Address =db.Address
// import opencage from "opencage-api-client";

// opencage
// .geocode({ q: `${latitude} + ${longitude}`, key: API_key})
// .then((res) => {
//   setSuburb(res.results[0].components.suburb);
//   setKota(res.results[0].components.city_district);
//   console.log(res);
// })
// .catch((error) => {
//   console.log("error", error.message);
// });

// module.exports = {
//     signAddress: async (req, res) =>{
//         try{
//           const {kota, provinsi, kecamatan, kode_pos} = req.body
//           const user_id = req.params.id
//           const lat = opencage.geocode({ q: `${latitude} + ${longitude}`, key: API_key})
//           .then((res) => {
//             setSuburb(res.results[0].components.suburb);
//             setKota(res.results[0].components.city_district);
//             console.log(res);
//           })

//           const addressResult = await Address.create({
//             user_id,
//             kota,
//             provinsi,
//             kecamatan,
//             kode_pos,
//             is_main: true

//           })

//           res.status(200).send({
//             message: "Address added succesfully",
//             data: addressResult
//           })

//         }
//         catch (err) {
//           console.error(err);
//           res.status(400).send(err);
//         }
//       },
      
      
// }