const db = require('../models')
const User = db.User
const Address =db.Address
const axios = require("axios")

module.exports = {
    testing: async (req, res) => {
        try {
          const data = await User.findAll();
          res.status(200).send({
            message: "Successfully get all users data",
            data,
          })
        } catch (err) {
          console.log(err);
          res.status(400).send(err);
        }
      },

      update: async (req, res) => {
        try {
          const { name, gender, email, birthdate} = req.body;
          const profile_picture = req.file
          console.log("ini gambar", profile_picture)
        
          if (!name && !gender && !email && !birthdate && ! profile_picture) {
            throw {
              message: "There's nothing to update",
            };
          }
          //link > frontend lebih gampang 
          //nama file  > linknya bisa berubah2 
     
          const user = await User.findOne({
            where: { id: req.params.id }
          }); 
      
          if (!user) {
            throw {
              message: "User not found",
            };
          }
      
          if (name) {
            user.name = name;
          }
          if (gender) {
            user.gender = gender;
          }
          if (email) {
            user.email = email;
          }
          if (birthdate) {
            user.birthdate = birthdate;
          }
          if (profile_picture) {
            user.profile_picture = profile_picture.filename;
          }
      
          await user.save(); 
      
          res.status(200).json({
            message: "User updated successfully",
            user: user,
          });
        } catch (err) {
          console.error(err);
          res.status(400).send(err);
        }
      },

      // Address Controller
      signAddress: async (req, res) => {
        try {
          const { kota, provinsi, kecamatan, kode_pos } = req.body;
          const opencage = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=bf4320abed844834a64e30080b0b5cb4&q=${kota}, ${provinsi}&pretty=1`);
          const lat = opencage.data.results[0].geometry.lat;
          const lng = opencage.data.results[0].geometry.lng;
          const user_id = req.params.id;
      
          const userFirstAddress = await Address.findAll({
            where: {
              user_id
            }
          });
          
          const addressResult = await Address.create({
            user_id,
            kota,
            provinsi,
            kecamatan,
            kode_pos,
            is_main: userFirstAddress.length === 0 ? true : false,
            lat,
            lng
          });
      
          res.status(200).send({
            message: "Address added successfully",
            data: addressResult
          });
        } catch (err) {
          console.error(err);
          res.status(400).send(err);
        }
      },
      
      getAddress : async (req, res) => {
        try{
          const userId = req.params.id
          const userAddress = await Address.findAll({
            where:{
              user_id: userId
            }
          })
          res.status(200).send({
            message: `successfully retrieve user: ${userId} addressess`,
            data: userAddress
          })
        }
        catch (err) {
          console.error(err);
          res.status(400).send(err);
        }
      },

      getMainAddress : async (req, res) => {
        try{
          const userId = req.params.id
          const result = await Address.findOne({
            where:{
              user_id: userId,
              is_main: true
            }
          })
          res.status(200).send({
            message: `successfully retrieve user: ${userId} main addressess`,
            data: result
          })
        }
        catch (err) {
          console.error(err);
          res.status(400).send(err);
        }
      },

      setAddress : async (req, res) => {
        try{
          const {id, user_id,  is_main} = req.body
          const reset = await Address.update({is_main: false},{
            where:{
              user_id
            }
          })
          const newStatus = await Address.update({is_main: true}, {
            where:{
              id
            }
          })
          res.status(200).send({
            message: `successfully update user addressess`,
            data: newStatus
          })         
        }
        catch (err) {
          console.error(err);
          res.status(400).send(err);
        }
      },

      deleteAddress : async (req, res) => {
        try{
          const { id } = req.body 
          const deleteUser = await Address.destroy({
            where:{
              id
            }
          })
          res.status(200).send({
            message: `successfully delete user addressess`,
          })        
        }
        catch (err) {
          console.error(err);
          res.status(400).send(err);
        }
      }   
}

