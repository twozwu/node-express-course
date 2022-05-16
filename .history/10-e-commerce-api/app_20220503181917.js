require("dotenv").config();
require("express-async-errors");
const morgan = require("morgan");

//database
const connectDB = require("./db/connect");
//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const express = require("express");
const app = express();

app.use(morgan("tiny"));
app.use(express.json());

//route
app.get("/", (req, res) => {
  throw new Error("hello there");
  res.send("main app");
});

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
