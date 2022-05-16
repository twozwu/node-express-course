const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res, next) => {
  res.send("upload product image");
};

module.exports = {
  uploadProductImage,
};
