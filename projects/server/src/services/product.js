const db = require("../models");
const { Op } = require("sequelize");
const Products = db.Products;

const createProduct = async (
  name,
  category_id,
  price,
  image_url,
  desc,
  stock,
  branch_id
) => {
  const transaction = await db.sequelize.transaction();

  try {
    const productExists = await Products.findOne({
      where: {
        name,
      },
    });

    if (productExists?.dataValues)
      throw new Error("Product with that name already exists");

    const newProduct = await Products.create(
      {
        name,
        category_id,
        price,
        image_url,
        desc,
      },
      { transaction }
    );

    const branches = await db.Branch.findAll();
    const stocks = branches.map((branch) => ({
      product_id: newProduct.id,
      stock: branch.id === branch_id ? stock : 0,
      branch_id: branch.id,
    }));

    const createdStocks = await db.Stocks.bulkCreate(stocks, { transaction });

    for (const s of createdStocks) {
      const { id, stock } = s;
      if (stock > 0) {
        await db.Stock_History.create(
          {
            stock_id: id,
            status: "IN",
            qty: stock,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();
    return newProduct;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

const updateProduct = async (
  productId,
  name,
  category_id,
  price,
  updateImage,
  desc,
  stock_id,
  stock,
  user
) => {
  const transaction = await db.sequelize.transaction();

  try {
    const productExists = await Products.findOne({
      where: {
        name,
        id: { [Op.not]: productId },
      },
    });

    if (productExists?.dataValues)
      throw new Error("Product with that name already exists");

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

    if (
      user.role === "admin" &&
      existingStock?.dataValues?.branch_id !== user.branch_id
    )
      throw new Error("Unauthorized");

    const deltaStock = stock - existingStock?.dataValues?.stock;
    const status = deltaStock > 0 ? "IN" : deltaStock < 0 ? "OUT" : null;

    if (status) {
      await db.Stocks.update(
        {
          stock,
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
          stock_id,
          status,
          qty: Math.abs(deltaStock),
        },
        { transaction }
      );
    }

    await transaction.commit();
    return isUpdated;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

const deleteProduct = async (productId) => {
  const transaction = await db.sequelize.transaction();

  try {
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
    return isDeleted;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
