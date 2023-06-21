const access = process.env.KEY_ACCESS;

module.exports = {
  authorize: async (req, res, next) => {
    // console.log("kelompok_3", req.headers.key);
    // console.log("kelompokini_3", access);
    if (req.headers.key == access) {
      return next();
    }
    res.status(500).send({ message: "authorize failed" });
  },
};
