const db = require("../models");
const { Sequelize } = require("sequelize");
const sequelize = db.sequelize;

async function fetchSalesReport(req, res) {
  try {
    const branch_id = parseInt(req.query.branchId);
    const filterByDate = req.query.searchDate;
    const sortBy = req.query.sortBy;

    // jika ada data pecah dgn index
    let startDate = filterByDate ? filterByDate[0] : null;
    let endDate = filterByDate ? filterByDate[1] : null;

    if (startDate && endDate) {
      startDate += " 00:00:01";
      endDate += " 23:59:59";
    }

    let clauseFilterByDate =
      startDate && endDate
        ? `AND TH.date BETWEEN "${startDate}" AND "${endDate}"`
        : "";

    let clauseBranchId = branch_id ? `AND TH.branch_id = ${branch_id}` : "";

    let ClauseSortBy =
      sortBy === "Newer"
        ? "ORDER BY TH.date ASC"
        : sortBy === "Older"
        ? "ORDER BY TH.date DESC"
        : sortBy === "Price (Low - High)"
        ? "ORDER BY TD.qty * TD.product_price ASC"
        : sortBy === "Price (High - Low)"
        ? "ORDER BY TD.qty * TD.product_price DESC"
        : "";

    const data = await sequelize.query(
      `SELECT Th.id,TH.total_price, TH.date,TH.status ,
      TD.product_name, TD.qty , TD.qty * TD.product_price total,
      B.name Branch_name,
      U.name User_name
      FROM transaction_headers TH
      JOIN transaction_details TD ON TH.id = TD.transaction_header_id
      JOIN branches B ON TH.branch_id = B.id
      JOIN users U ON TH.user_id = U.id
      WHERE TH.status = 'Pesanan Dikonfirmasi' 
      ${clauseFilterByDate}
      ${clauseBranchId}
      ${ClauseSortBy};`,

      { type: Sequelize.QueryTypes.SELECT }
    );

    // subtotal
    const data2 = await sequelize.query(
      `SELECT COUNT(DISTINCT U.id) AS total_customers,
      COUNT(*) AS transaction_totals, 
      SUM(TD.qty * TD.product_price) subTotal
      FROM transaction_headers TH
      JOIN transaction_details TD ON TH.id = TD.transaction_header_id
      JOIN branches B ON TH.branch_id = B.id
      JOIN users U ON TH.user_id = U.id
      WHERE TH.status = 'Pesanan Dikonfirmasi' 
      ${clauseFilterByDate}
      ${clauseBranchId}
      
      ${ClauseSortBy};`,

      { type: Sequelize.QueryTypes.SELECT }
    );

    return res.status(200).send({ df: data, total: data2 });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { fetchSalesReport };
