const db = require("../models");
const { Sequelize } = require("sequelize");
const sequelize = db.sequelize;

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
};
