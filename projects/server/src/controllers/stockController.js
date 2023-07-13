const db = require("../models");
const { Op } = require("sequelize");
const Stocks = db.Stocks;

async function getStocks(req, res) {
  try {
    const itemsPerPage = 12;

    const page = parseInt(req.query.page);
    const productName = req.query.q;
    const productId = parseInt(req.query.id);
    const categoryId = parseInt(req.query.categoryId);
    const branchId = parseInt(req.query.branchId);
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

    const stocks = await Stocks.findAndCountAll({
      attributes: ["id", "stock"],
      where: {
        ...branchClause,
        ...stockClause,
      },
      include: [
        {
          model: db.Products,
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          where: { ...categoryClause, ...productClause, ...productIdClause },
          include: [
            {
              model: db.Category,
              attributes: ["id", "name"],
            },
            {
              model: db.Voucher,
              attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
              },
            },
          ],
        },
        {
          model: db.Branch,
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
      ...offsetLimit,
      order: sortMap[sortType] || null,
    });

    return res.status(200).json({
      stocks,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function createStock(req, res) {
  try {
    const { product_id, branch_id } = req.body;
    if (!product_id || !branch_id)
      throw new Error("Product / Branch cannot be empty");
    const stockExists = await Stocks.findOne({
      where: {
        product_id,
        branch_id,
      },
    });
    if (stockExists?.dataValues) throw new Error("Stock already exists");

    const newStock = await Stocks.create({
      product_id,
      branch_id,
    });
    return res.status(201).json({
      stock: newStock,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function updateStock(req, res) {
  try {
    const stockId = req.params.id;
    const { stock } = req.body;
    if (!stock) throw new Error("Stock cannot be empty");

    const [isUpdated] = await Stocks.update(
      { stock },
      {
        where: {
          id: stockId,
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

module.exports = {
  getStocks,
  createStock,
  updateStock,
};
