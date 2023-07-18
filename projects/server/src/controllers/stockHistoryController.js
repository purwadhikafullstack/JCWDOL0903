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

    console.log('branchId', branch_id)


    let startDate = filterByDate ? filterByDate[0] : null;
    let endDate = filterByDate ? filterByDate[1] : null;

    if (startDate && endDate) {
      startDate += " 00:00:00";
      endDate += " 23:59:59";
    }


    let clauseFilterByDate =
      startDate && endDate
        ? `where sh.createdAt BETWEEN '${startDate}' AND '${endDate}'`
        : "";
        
       

        let clauseFilterByProduct = filterByproduct
        ? clauseFilterByDate ? `AND p.name LIKE '%${filterByproduct}%'`: `WHERE p.name LIKE '%${filterByproduct}%'`
        : "";
      

        let clauseBranchId = branch_id ? 
        clauseFilterByDate || clauseFilterByProduct ? `AND b.id = ${branch_id}` : `WHERE b.id = ${branch_id}` : "";
      
        console.log('clausbranc', clauseBranchId)

    let ClauseSortByDate =
      sortByDate === "Newer"
        ? "ORDER BY sh.createdAt DESC"
        : sortByDate === "Older"
        ? "ORDER BY sh.createdAt ASC"
        : "";

        console.log('sortby', sortByDate)
        console.log('clasuedate', ClauseSortByDate)
  
    const data = await sequelize.query(
      `select sh.id, sh.status, sh.qty, sh.createdAt date,
      ifnull(th.branch_id, s.branch_id) Branch_id,
      b.name branch_name,
      p.name product_name
      from Stock_Histories sh
      LEFT JOIN Transaction_Headers th on sh.transaction_header_id = th.id
      LEFT JOIN Stocks s on sh.stock_id = s.id
      LEFT JOIN Products p on s.product_id = p.id
      LEFT JOIN Branches b on s.branch_id = b.id
      ${clauseFilterByDate} 
      ${clauseBranchId}
      ${clauseFilterByProduct}
      ${ClauseSortByDate};`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    console.log('tets')
    return res.status(200).send({ df: data });
  } catch (error) {
    return res.status(400).send(error)
  }
}

module.exports = { fetchStockHistory };
