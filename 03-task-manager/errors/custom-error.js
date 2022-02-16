class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message); //調用父類的構造方法並傳入訊息
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
