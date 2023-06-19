const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.User;

module.exports = {
  changePass: async (req, res) => {
    try {
      const userId = req.params.id;
      console.log("id", userId);
      const { old_pass, new_pass, confirm_pass } = req.body;

      // console.log(req.body);
      if (!old_pass || !new_pass || !confirm_pass)
        throw {
          message: "Please complete your data",
        };
      if (new_pass !== confirm_pass)
        throw {
          message: "Password does not match",
        };

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(new_pass, salt);

      await User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      res.send({
        message: "Password updated successfully",
      });

      // console.log(hashPassword);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};
