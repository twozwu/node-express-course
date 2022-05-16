const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/:id").get(getSingleUser); //:id需放下面，以免找不到

module.exports = router;
