const jwt = require("jsonwebtoken");
// const CustomAPIError = require("../errors/custom-error");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose validation
  // Joi，驗證資料
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).send({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, you r lucky number is ${luckyNumber}`,
  });
};

// 共用碼抽離前
// const dashboard = async (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     throw new CustomAPIError("No token provide", 401);
//   }
//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); //解碼
//     console.log(decoded); //{ id: 14, username: 'pit', iat: 1644825994, exp: 1647417994 }
//     const luckyNumber = Math.floor(Math.random() * 100);
//     res.status(200).json({
//       msg: `Hello, ${decoded.username}`,
//       secret: `Here is your authorized data, you r lucky number is ${luckyNumber}`,
//     });
//   } catch (error) {
//     throw new CustomAPIError("Not authorized to access this route", 401);
//   }
// };

module.exports = { login, dashboard };
