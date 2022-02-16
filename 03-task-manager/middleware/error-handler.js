const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  //檢視err是否存在於CustomAPIError的鏈上(是不是透過createCustomError而來)
  if (err instanceof CustomAPIError) {
    //是的話就回傳自訂訊息
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
