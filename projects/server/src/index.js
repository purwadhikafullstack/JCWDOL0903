const express = require("express");
const cors = require("cors");
const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const db = require("./models");
const { authorize } = require("../src/middleware/validator");
const {
  productRouter,
  authRouter,
  changePassRouter,
  categoryRouter,
  profillingRouter,
  voucherRouter,
  branchRouter,
  cartRouter,
  rajaOngkirRouter,
  stockRouter,
  adminRouter,
  transactionHeaderRouter,
  transactionRouter,
  stockHistoryRouter,
  SalesReportRouter,
  transactionDetailsRouter,
} = require("./routers");

const userVoucherRouter = require("./routers/userVoucherRouter");
const cron = require("node-cron");
const { confirmTransactionsAfter7D } = require("./services/transaction");

const PORT = process.env.PORT || 8000;

// Run every day at 07:00 WIB
cron.schedule("0 7 * * *", confirmTransactionsAfter7D, {
  scheduled: true,
  timezone: "Asia/Jakarta",
});

const app = express();

app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAIN &&
        process.env.WHITELISTED_DOMAIN.split(","),
    ],
  })
);

app.use(cors());
app.use(express.json());

const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// // Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

db.connect((err) => {
  if (err) return console.log(err);
  console.log("Success connect to mysql");
});

db.connect((err) => {
  if (err) return console.log(err);
  console.log("Success connect to mysql");
});
// ini kak yang kita pindahin 

app.use("/static", express.static(join(__dirname, "..", "public")));
app.use("/api", authorize);

//#region API ROUTES
// app.use("/auth", authRouters);

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api", changePassRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/category", categoryRouter);
app.use("/api/profile", profillingRouter);
app.use("/api/branch", branchRouter);
app.use("/api", rajaOngkirRouter);
app.use("/api/vouchers", voucherRouter);
app.use("/api/stocks", stockRouter);
app.use("/api/transaction-header", transactionHeaderRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/user-vouchers", userVoucherRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/stock-history", stockHistoryRouter);
app.use("/api/sales-report", SalesReportRouter);
app.use("/api", transactionDetailsRouter);

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

// #endregion

// #region CLIENT


// #endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    // db.sequelize.sync({ alter: true });
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
