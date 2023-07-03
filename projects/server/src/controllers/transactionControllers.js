const db = require('../models')
const transDet = db.Transaction_Details
const transHead =db.Transaction_Header

module.exports = {

    createTransaction: async (req, res) => {
    try{
        const { cart, selectedShippingOption } = req.body
        const user_id = req.params.id
        const totalPrice = cart.reduce((total, product) => {
            return total + product.Product.price * product.qty
        }, 0) 

        const transactionHeader = await  transHead.create({
            user_id,
            branch_id: 1 /*cart.Product.Stocks[0].Branch.id*/,
            user_voucher_id: null,
            expedition_id: 1,
            total_price: totalPrice,
            date: new Date(),
            status: "Menunggu Pembayaran",
            expedition_price: parseInt(selectedShippingOption)
        })

        const newTransaction = await transDet.bulkCreate(
            cart.map((product) => {
                return{
                    transaction_header_id: transactionHeader.id,
                    product_id: product.product_id,
                    qty: product.qty,
                    product_name: product.Product.name,
                    product_price: product.Product.price,
                }
            })
        )
        res.status(200).send({
            message: "Transaction successfully created",
            data: {
                Transaction_Header: transactionHeader,
                Transaction_detail: newTransaction,
            },
            });
    }catch (err){
        console.log(err);
        res.status(400).send(err);
    }
 },

 getTransactionHead: async (req, res) =>{
    try{
        
    }catch (err){
        console.log(err);
        res.status(400).send(err);
    }
 }

}
