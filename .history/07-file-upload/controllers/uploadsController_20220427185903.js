const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res, next) => {
  console.log(req.body);
  res.send("upload product image");
};

module.exports = {
  uploadProductImage,
};
