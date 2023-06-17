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

async function createCategory(req, res) {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({
      name,
    });
    return res.status(201).json({
      category: newCategory,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function updateCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const [isUpdated] = await Category.update(req.body, {
      where: {
        id: categoryId,
      },
    });

    if (!isUpdated) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const isDeleted = await Category.destroy({
      where: {
        id: categoryId,
      },
    });

    if (!isDeleted) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
