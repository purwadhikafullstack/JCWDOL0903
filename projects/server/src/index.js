require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
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

app.use("/static", express.static(join(__dirname, "..", "public")));
app.use(authorize);

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

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use(changePassRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/category", categoryRouter);
app.use("/profile", profillingRouter);
app.use("/branch", branchRouter);
app.use(rajaOngkirRouter);
app.use("/vouchers", voucherRouter);
app.use("/stocks", stockRouter);
app.use("/transaction-header", transactionHeaderRouter);
app.use("/transaction", transactionRouter);
app.use("/user-vouchers", userVoucherRouter);
app.use("/transactions", transactionRouter);
app.use(transactionDetailsRouter);

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

//#endregion

//#region CLIENT
// const clientPath = "../../client/build";
// app.use(express.static(join(__dirname, clientPath)));

// // Serve the HTML page
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, clientPath, "index.html"));
// });

// db.connect((err) => {
//   if (err) return console.log(err);
//   console.log("Success connect to mysql");
// });

// db.connect((err) => {
//   if (err) return console.log(err);
//   console.log("Success connect to mysql");
// });

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    // db.sequelize.sync({ alter: true });
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
