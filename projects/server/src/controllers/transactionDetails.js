const db = require("../models");

module.exports = {
  fetchTransactionDetails: async (req, res) => {
    const transHead = req.params.head
    try{
        const result = await db.Transaction_Details.findAll({
            where:{
                transaction_header_id: transHead
            },
            include: [{
              model: db.Transaction_Header,
              attributes: ["invoice"]
            },
            {
              model: db.Products,
              attributes: ["name","image_url"]
            }             
            ]
        })
        res.status(200).send({
            message: "Successfully fetch user transaction details",
            data: {
              Transaction_Details: result,
            },
          });
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
  }

};
