const db = require("../models");
const { Op } = require("sequelize");
const Products = db.Products;

async function getProducts(req, res) {
  try {
    const itemsPerPage = 12;

    const page = parseInt(req.query.page) || 1;
    const productName = req.query.q;
    const categoryId = parseInt(req.query.categoryId);
    const branchId = parseInt(req.query.branchId);
    const isDeleted = parseInt(req.query.deleted);
    const sortType = req.query.sort;

    const sortMap = {
      name_asc: [["name", "ASC"]],
      name_desc: [["name", "DESC"]],
      price_asc: [["price", "ASC"]],
      price_desc: [["price", "DESC"]],
    };

    const categoryClause = categoryId ? { category_id: categoryId } : {};
    const branchClause = branchId ? { branch_id: branchId } : {};
    const productClause = productName
      ? { name: { [Op.like]: "%" + productName + "%" } }
      : {};
    const deletedClause = isDeleted ? { is_deleted: isDeleted } : {};

    const products = await Products.findAndCountAll({
      attributes: ["id", "name", "price", "image_url", "is_deleted", "desc"],
      where: {
        ...categoryClause,
        ...productClause,
        ...deletedClause,
      },
      include: [
        {
          model: db.Category,
          attributes: ["name"],
        },
        {
          model: db.Stocks,
          attributes: ["stock"],
          where: {
            ...branchClause,
          },
          include: {
            model: db.Branch,
            attributes: ["kota", "kecamatan", "provinsi", "kode_pos"],
          },
        },
      ],
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      order: sortMap[sortType] || null,
    });
    console.log(products)
    return res.status(200).json({
      products,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getProducts, 
};
