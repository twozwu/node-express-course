const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const { createTokenUser } = require("./createTokenUser");
console.log(createTokenUser);
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
};
