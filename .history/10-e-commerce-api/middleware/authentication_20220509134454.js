const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  try {
    console.log(token);
    const payload = isTokenValid({ token });
    console.log(payload);
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  next();
};

module.exports = {
  authenticateUser,
};
