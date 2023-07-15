const db = require("../models");
const { Sequelize } = require("sequelize");
const sequelize = db.sequelize;
const transHead = db.Transaction_Header;
const status = require("../constant/status")

module.exports = {
  fetchTransactionHeader: async (req, res) => {
    try {
      // console.log("ini ini", req.params);
      // ambil id user
      // const idUser = req.params.id;
      // mengambil id untuk fitur sorting branchId
      const SortbranchId = parseInt(req.query.branch_Id);

      // console.log("ini params", idUser);
      console.log(SortbranchId);

      //   cek data usernya
      // const user = await db.User.findOne({
      //   where: { id: idUser },
      // });

      //   ambil role usernya
      // const roleUser = user.dataValues.role;
      //   ambil branchId nya
      // const branchId = user.dataValues.branch_id;

      // if (roleUser === "admin") {
      //   const data = await sequelize.query(
      //     `SELECT C.name, IFNULL(trans.total,0) As Total  FROM categories c
      //     LEFT JOIN (SELECT td.product_id, P.category_id, IFNULL(product_price * TD.qty,0) AS total, TH.branch_id FROM transaction_headers th
      //     JOIN transaction_details td ON td.transaction_header_id = th.id
      //     LEFT JOIN products P ON P.id = td.product_id
      //     ) trans ON trans.category_id = c.id AND trans.branch_id = ${branchId}
      //     GROUP BY C.name`,
      //     { type: Sequelize.QueryTypes.SELECT }
      //   );

      //   return res.status(200).send({ data: data });
      // } else if (roleUser === "superadmin" && !SortbranchId) {
      //   const data = await sequelize.query(
      //     `SELECT C.name, IFNULL(trans.total,0) As Total  FROM categories c
      //       LEFT JOIN (SELECT td.product_id, P.category_id, IFNULL(product_price * TD.qty,0) AS total, TH.branch_id FROM transaction_headers th
      //       JOIN transaction_details td ON td.transaction_header_id = th.id
      //       LEFT JOIN products P ON P.id = td.product_id
      //       ) trans ON trans.category_id = c.id AND trans.branch_id
      //       GROUP BY C.name`,

      //     { type: Sequelize.QueryTypes.SELECT }
      //   );
      //   return res.status(200).send({ data: data });
      // } else if (roleUser === "superadmin" || SortbranchId) {
      //   const data = await sequelize.query(
      //     `SELECT C.name, IFNULL(trans.total,0) As Total  FROM categories c
      //     LEFT JOIN (SELECT td.product_id, P.category_id, IFNULL(product_price * TD.qty,0) AS total, TH.branch_id FROM transaction_headers th
      //     JOIN transaction_details td ON td.transaction_header_id = th.id
      //     LEFT JOIN products P ON P.id = td.product_id
      //     ) trans ON trans.category_id = c.id AND trans.branch_id = ${SortbranchId}
      //     GROUP BY C.name`,
      //     { type: Sequelize.QueryTypes.SELECT }
      //   );
      //   return res.status(200).send({ data: data });
      // }
      let where = SortbranchId ? `AND trans.branch_id = ${SortbranchId} ` : "";
      // 0 1 2 3 4 5 6
      const data = await sequelize.query(
        `SELECT C.name, IFNULL(trans.total,0) As Total  FROM categories c
          LEFT JOIN (SELECT td.product_id, P.category_id, IFNULL(product_price * TD.qty,0) AS total, TH.branch_id FROM transaction_headers th
          JOIN transaction_details td ON td.transaction_header_id = th.id
          LEFT JOIN products P ON P.id = td.product_id
          ) trans ON trans.category_id = c.id  ${where}
          GROUP BY C.name`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      return res.status(200).send({ data: data });
    } catch (error) {
      console.log("err", error);
      return res.status(400).send({ data: error });
    }
  },

  setTransImage : async (req, res) => {
    try{
      const file = req.file
      const result = await transHead.findOne({
        where: 
        {id: req.params.id}
      })

      console.log(file);
      
      // console.log("cek",transHea)
      await transHead.update({
        user_payment: file.filename,
        status: status.menunggu_konfirmasi 
      },{
        where:
        {id: req.params.id}
      })
      // console.log("user_", user_payment)
      console.log("ini status", status)

      res.status(200).json({
        message: "transhead updated successfully",
        transHead: result,
      });
    }
    catch (error) {
      console.log("err", error);
      return res.status(400).send({ data: error });
    }
  },

  

  deleteTransactionHeader : async(req,res) => {
    try{
      const {id, cart} = req.body

      await db.Stock_History.destroy({
        where:{
          transaction_header_id: id
        }
        
      })

      const result = await transHead.destroy({
        where:{
          id,
          status: "Menunggu Pembayaran"
        }
      })
     

        const stocks = cart.Transaction_Details.map(async (product) => {
          const currentStock = await db.Stocks.findOne({
            where: {
              product_id: product.Product.id,
              branch_id: cart.branch_id,
            },
          });

          const currentSoldProducts = await db.Products.findOne({
            where:{
              id: product.Product.id
            }
          })
          
          const updatedSoldProducts = currentSoldProducts.sold - product.qty
        
          const updatedStock = currentStock.stock + product.qty;

          await db.Products.update({sold: updatedSoldProducts},
            {
              where: {
                id: product.Product.id
              }
            })
        
          await db.Stocks.update(
            {
              stock: updatedStock,
            },
            {
              where: {
                product_id: product.Product.id,
                branch_id: cart.branch_id,
              },
            }
          );
        });

      

        res.status(200).send({
          message: "Transaction Canceled",
          data: {
              result,
          },
          });

    }catch (error) {
      console.log("err", error);
      return res.status(400).send({ message:"Unable to Cancle Order" });
    }
  },

 confirmTransactionsAfter1D  : async(req, res) => {
  try {
    if (!(req.user.role === "admin" || req.user.role === "superadmin"))
      throw new Error("Unauthorized");

    const [isUpdated] = await transHead.update(
      { status: status.dibatalkan },
      {
        where: {
          status: status.menunggu_pembayaran,
          date: {
            [Op.lt]: fn(
              "DATE_SUB",
              literal("CURDATE()"),
              literal("INTERVAL 1 DAY")
            ),
          },
        },
      }
    );
    if (!isUpdated) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
},




};
