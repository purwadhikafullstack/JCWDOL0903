const access = process.env.ACCESS_KEY;

module.exports = {
  authorize: async (req, res, next) => {
    if (req.headers.access == access) {
      return next();
    }
    res.status(401).send({ error: "Unauthorized" });
  },
};
