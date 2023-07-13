const db = require("../models");
const Cart = db.Cart;

module.exports = {
  getCart: async (req, res) => {
    try {
      const user_id = req.params.id;

      console.log("lanjut ternyata");

      const cart = await Cart.findAll({
        where: {
          user_id,
        },
        include:{
            model: db.Products,
            attributes: ["name", "price", "image_url"],
            include:[{
                model: db.Stocks,
                attributes: ["stock"],
                include:{
                    model: db.Branch,
                    attributes: ["id", "kota"]
                }
            },
            {
              model: db.Voucher,
              attributes: ["voucher_type", "amount", "percentage", "limit"],
              required: false
            }]
        }
      })
      res.status(200).send({
        message: `successfully retrieve user: ${user_id} cart `,
        cart: cart,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getUserCart: async (req, res) => {
    try {
      const { user_id } = req.body;
      const result = await Cart.sum("qty", {
        where: {
          user_id,
        }
      });
      const totalQuantity = result || 0;
      res.status(200).send({
        message: `successfully retrieve user: ${user_id} cart `,
        data: totalQuantity,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  addToCart: async (req, res) => {
    try {
      const { product_id, user_id, qty } = req.body;
      
      console.log("ini qty", qty)
      
      // untuk cek apakah sudah ada produk di dalam cart user
      const findUserCart = await Cart.findOne({
        where: {
          user_id,
          product_id,
        },
      });
      // untuk cek apakah pertama kalinya user masukin barang ke cart
      const findUserExist = await Cart.findOne({
        where: {
          user_id,
        },
      });
      if (!findUserCart && !findUserExist) {
        const addNewProductCart = await Cart.create({
          product_id,
          user_id,
          qty,
        });
        res.status(200).send({
          message: `Successfully add new product to cart`,
          data: addNewProductCart,
        });
      } else if (findUserCart || findUserExist) {
        const findAvailableCart = await Cart.findOne({
          where: {
            user_id,
          },
          include: {
            model: db.Products,
            attributes: ["name", "price", "image_url"],
            include: {
              model: db.Stocks,
              attributes: ["stock", "branch_id"],
            },
          },
        });
        const findInputBranch = await db.Stocks.findOne({
          where: {
            product_id,
          },
        });
        const branchCart =
          findAvailableCart.dataValues.Product.dataValues.Stocks[0].dataValues
            .branch_id;
        const newBranchCart = findInputBranch.dataValues.branch_id;

        if (branchCart !== newBranchCart) {
          await Cart.destroy({
            where: {
              user_id,
            },
          });
          const addNewProductCart = await Cart.create({
            product_id,
            user_id,
            qty,
          });
          res.status(200).send({
            message: `Successfully delete old cart and created a new cart`,
            data: addNewProductCart,
          });
        } else if (branchCart === newBranchCart) {
          if (!findUserCart) {
            const addNewProductCart = await Cart.create({
              product_id,
              user_id,
              qty,
            });
            res.status(200).send({
              message: `Successfully add new product to cart`,
              data: addNewProductCart,
            });
          } else {
            const currentQty = findUserCart.dataValues.qty;
            const updatedQty = currentQty + qty;

            const addProductCart = await Cart.update(
              { qty: updatedQty },
              {
                where: {
                  product_id,
                  user_id,
                },
              }
            );
            res.status(200).send({
              message: `Amount of this product in your cart is now ${
                currentQty + qty
              }`,
              data: addProductCart,
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  reduceCartOne: async (req, res) => {
    try {
      const { product_id, qty } = req.body;
      const user_id = req.params.id;
      const findUserCart = await Cart.findOne({
        where: {
          user_id,
          product_id,
        },
      });
      if (!findUserCart)
        throw {
          message: "Theres no such products",
        };

      const currentQty = findUserCart.dataValues.qty;
      const updatedQty = currentQty - qty;

      if (updatedQty === 0) {
        await Cart.destroy({
          where: {
            product_id,
            user_id,
          },
        });
        res.status(200).send({
          message: `Your product is 0 so is deleted`,
        });
      } else {
        const addProductCart = await Cart.update(
          { qty: updatedQty },
          {
            where: {
              product_id,
              user_id,
            },
          }
        );
        res.status(200).send({
          message: `Amount of this product in your cart is now reduce to ${
            currentQty - 1
          }`,
          data: addProductCart,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  deleteCart: async (req, res) => {
    try {
      const { product_id } = req.body;
      const user_id = req.params.id;
      await Cart.destroy({
        where: {
          user_id,
          product_id,
        },
      });
      res.status(200).send({ message: "Item deleted from your cart" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }  
};