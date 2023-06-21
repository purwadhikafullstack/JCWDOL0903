const resetPass2 = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      console.log("Token not found");
    } else {
      console.log("Token AD");
    }

    // ...
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { resetPass2 };
