const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

/** 傳統寫法 */
// const authorizePermissions = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     throw new CustomError.UnauthorizedError(
//       "Unauthorized to access this route"
//     );
//   }
//   next();
// };

/** 在路徑設權限寫法： */
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    // console.log(roles); //[ 'admin', 'owner' ]
    //如果設定的roles不包含傳入的role，則丟出錯誤
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
