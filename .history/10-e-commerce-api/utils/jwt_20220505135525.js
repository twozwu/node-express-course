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

const attachCookiesToResponse = (req, res) => {
  const token = createJWT({ payload: user });

  // set cookie
  const oneDay = 1000 * 24 * 60 * 60;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.status(201).json({ user });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
