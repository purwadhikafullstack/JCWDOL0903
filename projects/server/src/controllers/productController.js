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
  const transaction = await db.sequelize.transaction();
  try {
    let { name, category_id, price, desc, stock, branch_id } = req.body;
    if (!name) throw new Error("Name cannot be empty");
    category_id = parseInt(category_id) || null;
    price = parseInt(price) || 0;
    stock = parseInt(stock) || 0;
    branch_id = parseInt(branch_id) || null;

    const newProduct = await Products.create(
      {
        name,
        category_id,
        price,
        image_url: req.file?.filename
          ? `${process.env.BASE_URL}/static/products/${req.file.filename}`
          : null,
        desc,
      },
      { transaction }
    );
    const branches = await db.Branch.findAll();
    const stocks = branches.map((branch) => ({
      product_id: newProduct.id,
      stock: stock ? (branch.id === branch_id ? stock : 0) : 0,
      branch_id: branch.id,
    }));
    await db.Stocks.bulkCreate(stocks, { transaction });
    // TODO: Add stock history

    await transaction.commit();

    return res.status(201).json({
      product: newProduct,
    });
  } catch (err) {
    await transaction.rollback();
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function updateProduct(req, res) {
  const transaction = await db.sequelize.transaction();
  try {
    const productId = parseInt(req.params.id);
    let { name, category_id, price, desc, stock, stock_id, isImgDeleted } =
      req.body;
    if (!name) throw new Error("Name cannot be empty");
    if (!stock_id) throw new Error("Stock ID cannot be empty");

    category_id = parseInt(category_id) || null;
    price = parseInt(price) || 0;
    stock = parseInt(stock) || 0;
    stock_id = parseInt(stock_id) || null;

    const updateImage = req.file?.filename
      ? {
          image_url: `${process.env.BASE_URL}/static/products/${req.file.filename}`,
        }
      : isImgDeleted
      ? { image_url: null }
      : {};

    const [isUpdated] = await Products.update(
      {
        name,
        category_id,
        price,
        ...updateImage,
        desc,
      },
      {
        where: {
          id: productId,
        },
        transaction,
      }
    );

    const existingStock = await db.Stocks.findOne({
      where: {
        id: stock_id,
      },
    });
    const deltaStock = stock - existingStock.stock;
    const status =
      deltaStock > 0
        ? "Penambahan Stok"
        : deltaStock < 0
        ? "Pengurangan Stok"
        : null;
    if (status) {
      await db.Stocks.update(
        {
          stock: stock || 0,
        },
        {
          where: {
            id: stock_id,
          },
          transaction,
        }
      );
      await db.Stock_History.create(
        {
          product_id: productId,
          status,
          qty: deltaStock,
          reference: "Admin Update",
        },
        { transaction }
      );
    }

    await transaction.commit();

    if (!isUpdated) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    await transaction.rollback();
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function deleteProduct(req, res) {
  const transaction = await db.sequelize.transaction();
  try {
    const productId = parseInt(req.params.id);

    await db.Stocks.destroy(
      {
        where: {
          product_id: productId,
        },
      },
      { transaction }
    );
    const isDeleted = await Products.destroy(
      {
        where: {
          id: productId,
        },
      },
      { transaction }
    );
    await transaction.commit();

    if (!isDeleted) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    await transaction.rollback();
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
