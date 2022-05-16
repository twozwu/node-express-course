require("dotenv").config();
require("express-async-errors");

// rest of the packages
const morgan = require("morgan");

//database
const connectDB = require("./db/connect");

// router
const authRouter = require('./routes/authRoutes')

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const express = require("express");
const app = express();

app.use(morgan("tiny"));
app.use(express.json());

//route
app.get("/", (req, res) => {
  res.send("main app");
});

app.use('/api/v1/auth', authRouter)

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