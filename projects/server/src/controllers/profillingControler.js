const db = require('../models')
const User = db.User

module.exports = {
    testing: async (req, res) => {
        try {
          const data = await user.findAll();
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
          const { name, gender, email, birthdate } = req.body;
      
          if (!name && !gender && !email && !birthdate) {
            throw {
              message: "There's nothing to update",
            };
          }
      
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
      
          await user.save(); 
      
          res.status(200).json({
            message: "User updated successfully",
            user: user,
          });
        } catch (err) {
          console.error(err);
          res.status(400).send(err);
        }
      }      
}

