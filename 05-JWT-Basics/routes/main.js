const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')

const authMiddleware = require('../middleware/auth') //驗證中間件

router.route('/dashboard').get(authMiddleware, dashboard) //會先驗證再接著跑dashboard
router.route('/login').post(login)

module.exports = router