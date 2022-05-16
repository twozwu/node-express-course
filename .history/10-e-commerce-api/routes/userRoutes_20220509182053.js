const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermissions } = require("../middleware/authentication"); //增加middleware

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.route("/").get(authenticateUser, authorizePermissions('admin', 'user'), getAllUsers); //先身分驗證取得user資料後再驗證權限

router.route("/showMe").get(authenticateUser, showCurrentUser); //用middleware取得cookie資料，not from database
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser); //:id需放下面，以免找不到showMe

module.exports = router;
