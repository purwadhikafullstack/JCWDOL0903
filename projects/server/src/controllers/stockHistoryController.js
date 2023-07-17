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


    let startDate = filterByDate ? filterByDate[0] : null;
    let endDate = filterByDate ? filterByDate[1] : null;

    if (startDate && endDate) {
      startDate += " 00:00:00";
      endDate += " 23:59:59";
    }


    let clauseFilterByDate =
      startDate && endDate
        ? `where SH.createdAt BETWEEN '${startDate}' AND '${endDate}'`
        : "";
        
       

        let clauseFilterByProduct = filterByproduct
        ? clauseFilterByDate ? `AND p.name LIKE '%${filterByproduct}%'`: `WHERE p.name LIKE '%${filterByproduct}%'`
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

  
    const data = await sequelize.query(
      `select sh.id, sh.status, sh.qty, sh.createdAt date,
      ifnull(th.branch_id, s.branch_id) Branch_id,
      b.name branch_name,
      p.name product_name
      from stock_histories sh
      LEFT JOIN transaction_headers th on sh.transaction_header_id = th.id
      LEFT JOIN stocks s on sh.stock_id = s.id
      LEFT JOIN products p on s.product_id = p.id
      LEFT JOIN branches b on s.branch_id = b.id
      ${clauseFilterByDate} 
      ${clauseBranchId}
      ${clauseFilterByProduct}
      ${ClauseSortByDate};`,
      { type: Sequelize.QueryTypes.SELECT }
    );


    return res.status(200).send({ df: data });
  } catch (error) {
    return res.status(400).send(error)
  }
}

module.exports = { fetchStockHistory };
