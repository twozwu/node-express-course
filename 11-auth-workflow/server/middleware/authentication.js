const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const Token = require('../models/Token');
const { attachCookiesToResponse } = require('../utils');

const authenticateUser = async (req, res, next) => {
  // const token = req.signedCookies.token;
  const { refreshToken, accessToken } = req.signedCookies;

  // if (!token) { //old
  //   throw new CustomError.UnauthenticatedError('Authentication Invalid');
  // }

  try {
    //如果短期token存在，就下一步
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid"); //or 導向登入
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
