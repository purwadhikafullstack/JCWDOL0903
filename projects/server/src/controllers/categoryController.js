const db = require("../models");
const Category = db.Category;

async function getCategories(req, res) {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name"],
    });
    return res.status(200).json({
      categories,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getCategories,
};
