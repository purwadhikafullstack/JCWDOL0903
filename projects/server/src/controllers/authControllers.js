const db = require("../models");
const nanoid = require('nanoid')
const user = db.User;

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username)
        throw {
          message: "Please insert username",
        };
      if (!password)
        throw {
          message: "Please insert password",
        };

      const userExist = await user.findOne({
        where: {
          username,
        },
      });

      if (!userExist)
        throw {
          message: "User not found",
        };

      // console.log(userExist);

      // const isvalid = await bcrypt.compare(password, userExist.password);

      // if (!isvalid)
      //   throw {
      //     message: "Incorrect password",
      //   };

      // const storeExist = await user_store.findOne({
      //   where: {
      //     user_id: userExist.id,
      //   },
      // });

      const payload = { id: userExist.id };
      const token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: "1h",
      });

      res.status(200).send({
        message: "Login Success",
        user: userExist,
        store: storeExist,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
};
