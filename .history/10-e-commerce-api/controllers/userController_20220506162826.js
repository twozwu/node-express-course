const getAllUsers = async (req, res) => {
  res.send("get all users routes");
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
  res.send("update users");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
