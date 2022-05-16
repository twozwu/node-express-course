require("dotenv").config();
require("express-async-errors");

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize'); //防資料庫注入攻擊

//database
const connectDB = require("./db/connect");

// router
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes")
const orderRouter = require("./routes/orderRoutes")

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const express = require("express");
const app = express();

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// app.use(morgan("tiny")); // 僅供測試環境
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); //進入API前會取得cookie的middleware

app.use(express.static('./public'))
app.use(fileUpload())

// //route
// app.get("/", (req, res) => {
//   res.send("e-commerce api");
// });
// app.get("/api/v1", (req, res) => {
//   // console.log(req.cookies); //一般cookie
//   console.log(req.signedCookies); //簽名cookie
//   res.send("e-commerce api");
// });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
