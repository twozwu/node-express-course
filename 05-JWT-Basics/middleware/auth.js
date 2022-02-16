const jwt = require('jsonwebtoken')
// const CustomAPIError = require("../errors/custom-error");
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) //解碼
    // console.log(decoded); //{ id: 14, username: 'pit', iat: 1644825994, exp: 1647417994 }
    const { id, username } = decoded
    req.user = { id, username } //將解碼資料加回req後傳給next
    next()
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
}

module.exports = authenticationMiddleware