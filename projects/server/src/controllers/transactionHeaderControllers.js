const db = require("../models");
const { Sequelize } = require("sequelize");
const sequelize = db.sequelize;
const transHead = db.Transaction_Header;
const status = require("../constant/status")

module.exports = {
  fetchTransactionHeader: async (req, res) => {
    try {
      // ambil id user
      const idUser = req.params.id;

      console.log("ini params", idUser);

      //   cek data usernya
      const user = await db.User.findOne({
        where: { id: idUser },
      });

      //   ambil role usernya
      const roleUser = user.dataValues.role;
      //   ambil branchId nya
      const branchId = user.dataValues.branch_id;

      if (roleUser === "admin") {
        const data = await sequelize.query(
          `SELECT C.name, IFNULL(trans.total,0) As Total  FROM categories c
          LEFT JOIN (SELECT td.product_id, P.category_id, IFNULL(product_price * TD.qty,0) AS total, TH.branch_id FROM transaction_headers th 
          JOIN transaction_details td ON td.transaction_header_id = th.id 
          LEFT JOIN products P ON P.id = td.product_id
          ) trans ON trans.category_id = c.id AND trans.branch_id = ${branchId}
          GROUP BY C.name`,
          { type: Sequelize.QueryTypes.SELECT }
        );

        return res.status(200).send({ data: data });
      } else if (roleUser === "superadmin") {
        const data = await db.Transaction_Header.findAll({
          include: [
            {
              model: db.Transaction_Details,
              include: [
                {
                  model: db.Products,
                  include: [db.Category],
                },
              ],
            },
          ],
        });

        console.log("data", data);

        return res.status(200).send({ data: data });
      }
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
  }

};
