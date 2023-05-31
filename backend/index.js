const dotenv = require("dotenv");
dotenv.config();
const express = require("express")
const PORT = process.env.PORT;
const app = express()
const db = require("./models")
const cors = require('cors');

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("This is my third latest API")
})

app.listen(PORT, () => {
    // db.sequelize.sync({ alter: true })
    console.log(`server running at port : ${PORT}`);
})
