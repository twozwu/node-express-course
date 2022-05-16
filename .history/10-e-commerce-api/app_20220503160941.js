const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(port, console.log(`server is on at port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
