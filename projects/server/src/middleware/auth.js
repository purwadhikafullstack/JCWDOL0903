const checkUser = async (req, res, next) => {
  const user_id = parseInt(req.params.id);

  if (user_id === 0)
    return res.status(400).send({ message: "User not yet registered" });

  next();
};

module.exports = { checkUser };
