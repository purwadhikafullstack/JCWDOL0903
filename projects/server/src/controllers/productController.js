const db = require("../models");
const { Op } = require("sequelize");
const Products = db.Products;

async function getProducts(req, res) {
  try {
    const itemsPerPage = 12;

    const page = parseInt(req.query.page);
    const productName = req.query.q;
    const productId = parseInt(req.query.id);
    const categoryId = parseInt(req.query.categoryId);
    const branchId = parseInt(req.query.branchId);
    const sortType = req.query.sort;

    const sortMap = {
      name_asc: [["name", "ASC"]],
      name_desc: [["name", "DESC"]],
      price_asc: [["price", "ASC"]],
      price_desc: [["price", "DESC"]],
    };

    const offsetLimit = {};
    if (page) {
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }

    const categoryClause = categoryId ? { category_id: categoryId } : {};
    const branchClause = branchId ? { branch_id: branchId } : {};
    const productClause = productName
      ? { name: { [Op.like]: "%" + productName + "%" } }
      : {};
    const productIdClause = productId ? { id: productId } : {};

    const products = await Products.findAndCountAll({
      attributes: ["id", "name", "price", "image_url", "desc"],
      where: {
        ...categoryClause,
        ...productClause,
        ...productIdClause,
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
      ...offsetLimit,
      order: sortMap[sortType] || null,
    });

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
