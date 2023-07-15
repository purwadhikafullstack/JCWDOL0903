const db = require("../models");
const { Sequelize } = require("sequelize");
const sequelize = db.sequelize;

async function fetchStockHistory(req, res) {
  try {
    console.log("query", req.query);
    // Sort by id
    const branch_id = parseInt(req.query.branchId);
    const sortByDate = req.query.sortDate;
    const filterByproduct = req.query.searchProduct;
    const filterByDate = req.query.date;

    console.log("branchid", branch_id);
    console.log("sortBydate", sortByDate);
    console.log("product", filterByproduct);
    console.log("filterBydate", filterByDate);

    let startDate = filterByDate ? filterByDate[0] : null;
    let endDate = filterByDate ? filterByDate[1] : null;

    if (startDate && endDate) {
      startDate += " 00:00:00";
      endDate += " 23:59:59";
    }

    console.log("start", startDate);
    console.log("end", endDate);

    let clauseFilterByDate =
      startDate && endDate
        ? `WHERE SH.createdAt BETWEEN '${startDate}' AND '${endDate}'`
        : "";

    let clauseFilterByProduct = filterByproduct
      ? `WHERE (P.name LIKE '%${filterByproduct}%' OR TD.product_name LIKE '%${filterByproduct}%')`
      : "";

    let clauseBranchId = branch_id
      ? `WHERE (S.branch_id = ${branch_id} OR TH.branch_id = ${branch_id})`
      : "";

    let ClauseSortByDate =
      sortByDate === "Newer"
        ? "ORDER BY SH.createdAt ASC"
        : sortByDate === "Older"
        ? "ORDER BY SH.createdAt DESC"
        : "";

    /**
     * Question:
     * 1. kenapa filter dari tanggal awal di database hingga 2023-12-05 tidak keluar tgl 5 ya
     */
    const data = await sequelize.query(
      `SELECT SH.id, SH.qty, SH.status, SH.createdAt,
      IFNULL(S.stock, '-') stock_saat_ini,
      IFNULL(P.name, '-') PRODUCT_IN,
      IFNULL(B.name, '-') BRANCH_IN,
      IFNULL(B_TRANS.name, '-') BRANCH_OUT,
      IFNULL(TD.product_name, '-') PRODUCT_OUT
      FROM stock_histories SH
      LEFT JOIN transaction_headers TH ON SH.transaction_header_id = TH.id
      LEFT JOIN transaction_details TD ON TH.id = TD.transaction_header_id
      LEFT JOIN branches B_TRANS ON TH.branch_id = B_TRANS.id
      LEFT JOIN stocks S ON SH.stock_id = S.id
      LEFT JOIN products P ON S.product_id = P.id
      LEFT JOIN branches B ON S.branch_id = B.id
      ${clauseFilterByDate} 
      ${clauseBranchId}
      ${clauseFilterByProduct}

      ${ClauseSortByDate};`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // console.log("ini datanya", data);
    return res.status(200).send({ df: data });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = { fetchStockHistory };
