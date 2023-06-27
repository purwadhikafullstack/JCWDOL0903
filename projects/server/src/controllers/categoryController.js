const db = require("../models");
const { Op } = require("sequelize");
const Category = db.Category;

async function getCategories(req, res) {
  try {
    const itemsPerPage = 12;

    const page = parseInt(req.query.page);
    const categoryName = req.query.q;
    const sortType = req.query.sort;

    const sortMap = {
      name_asc: [["name", "ASC"]],
      name_desc: [["name", "DESC"]],
    };

    const offsetLimit = {};
    if (page) {
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }

    const categoryNameClause = categoryName
      ? { name: { [Op.like]: "%" + categoryName + "%" } }
      : {};

    const categories = await Category.findAndCountAll({
      attributes: ["id", "name"],
      where: {
        ...categoryNameClause,
      },
      ...offsetLimit,
      order: sortMap[sortType] || null,
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
    if (!name) throw new Error("Name cannot be empty");
    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    });
    if (categoryExists?.dataValues) throw new Error("Category already exists");

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
    const categoryId = parseInt(req.params.id);
    const { name } = req.body;
    if (!name) throw new Error("Name cannot be empty");
    const categoryExists = await Category.findOne({
      where: {
        name,
        id: { [Op.not]: categoryId },
      },
    });
    if (categoryExists?.dataValues) throw new Error("Category already exists");

    const [isUpdated] = await Category.update(
      { name },
      {
        where: {
          id: categoryId,
        },
      }
    );

    if (!isUpdated) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const categoryId = parseInt(req.params.id);
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
