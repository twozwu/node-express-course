const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res, next) => {
  console.log("create product");
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res, next) => {
  res.send("list of products");
};

module.exports = {
  createProduct,
  getAllProducts,
};
