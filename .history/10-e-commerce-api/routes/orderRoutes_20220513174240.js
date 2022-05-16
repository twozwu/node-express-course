const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentOrder,
  updateOrder,
} = require("../controllers/orderController");

router.route("/").post(authenticateUser, createOrder);
