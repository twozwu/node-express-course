const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  console.log(payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => {
  jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  // set cookie
  const oneDay = 1000 * 24 * 60 * 60;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production', //https only
    signed: true, //使用簽名，避免偽造
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
