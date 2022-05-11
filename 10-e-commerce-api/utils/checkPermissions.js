const CustomError = require("../errors");

const checkPermission = (requestUser, resourceUserId) => {
  console.log(requestUser);
  console.log(resourceUserId);
  console.log(typeof resourceUserId); //resourceUserId為一個物件，因此需轉成string
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return; //如果id相等
  throw new CustomError.UnauthorizedError("Not authorized to access this role");
};

module.exports = checkPermission;
