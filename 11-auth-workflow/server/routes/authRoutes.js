const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const { authenticateUser } = require("../middleware/authentication");

router.post("/register", register);
router.post("/login", login);

// router.get("/logout", logout);
router.delete("/logout", authenticateUser, logout); //改成delete，因為要刪除資料庫的token

router.post("/verifyEmail", verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;
