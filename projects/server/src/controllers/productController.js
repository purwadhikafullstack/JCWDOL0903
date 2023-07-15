const db = require("../models");
const { Op } = require("sequelize");
const Products = db.Products;
const productHelper = require("../helpers/product");

async function getProducts(req, res) {
  try {
    const itemsPerPage = 12;

    const page = parseInt(req.query.page);
    const productName = req.query.q;
    const productId = parseInt(req.query.id);
    const categoryId = parseInt(req.query.categoryId);
    const branchId = parseInt(req.query.branchId);
    console.log("branch_id nih boy", branchId);
    const sortType = req.query.sort;
    const showEmptyStock = req.query.showEmptyStock;

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
    const stockClause =
      showEmptyStock === "false" ? { stock: { [Op.gt]: 0 } } : {};

    const products = await Products.findAndCountAll({
      subQuery: false,
      attributes: {
        exclude: ["category_id", "createdAt", "updatedAt", "deletedAt"],
      },
      where: {
        ...categoryClause,
        ...productClause,
        ...productIdClause,
      },
      include: [
        {
          model: db.Category,
          attributes: ["id", "name"],
        },
        {
          model: db.Stocks,
          attributes: ["id", "stock"],
          where: {
            ...branchClause,
            ...stockClause,
          },
          include: {
            model: db.Branch,
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        },
        {
          model: db.Voucher,
          attributes: {
            exclude: ["product_id", "createdAt", "updatedAt", "deletedAt"],
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

async function createProduct(req, res) {
  try {
    let { name, category_id, price, desc, stock, branch_id } = req.body;

    const userRole = req.user.role;
    if (
      !(userRole === "admin" || userRole === "superadmin") ||
      (userRole === "admin" && req.user.branch_id !== parseInt(branch_id))
    )
      throw new Error("Unauthorized");

    if (!name) throw new Error("Name cannot be empty");
    category_id = parseInt(category_id) || null;
    price = parseInt(price) || 0;
    stock = parseInt(stock) || 0;
    if (stock < 0 || price < 0)
      throw new Error("Stock / Price cannot be negative");
    branch_id = parseInt(branch_id) || null;

    const productImageURL = req.file?.filename ? req.file.filename : null;

    const newProduct = await productHelper.createProduct(
      name,
      category_id,
      price,
      productImageURL,
      desc,
      stock,
      branch_id
    );

    return res.status(201).json({
      product: newProduct,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function updateProduct(req, res) {
  try {
    if (!(req.user.role === "admin" || req.user.role === "superadmin"))
      throw new Error("Unauthorized");

    const productId = parseInt(req.params.id);
    let { name, category_id, price, desc, stock, stock_id, isImgDeleted } =
      req.body;

    if (!name) throw new Error("Name cannot be empty");
    if (!stock_id) throw new Error("Stock ID cannot be empty");

    category_id = parseInt(category_id) || null;
    price = parseInt(price) || 0;
    stock = parseInt(stock) || 0;
    if (stock < 0 || price < 0)
      throw new Error("Stock / Price cannot be negative");
    stock_id = parseInt(stock_id) || null;

    const updateImage = req.file?.filename
      ? {
          image_url: req.file.filename,
        }
      : isImgDeleted
      ? { image_url: null }
      : {};

    const isUpdated = await productHelper.updateProduct(
      productId,
      name,
      category_id,
      price,
      updateImage,
      desc,
      stock_id,
      stock,
      req.user
    );

    if (!isUpdated) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function deleteProduct(req, res) {
  try {
    if (!(req.user.role === "admin" || req.user.role === "superadmin"))
      throw new Error("Unauthorized");

    const productId = parseInt(req.params.id);
    const isDeleted = await productHelper.deleteProduct(productId);

    if (!isDeleted) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
