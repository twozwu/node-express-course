const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" });
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  res.send("get single users");
};
const showCurrentUser = async (req, res) => {
  res.send("get current user");
};
const updateUser = async (req, res) => {
  res.send(req.body);
};
const updateUserPassword = async (req, res) => {
  res.send("update users password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
