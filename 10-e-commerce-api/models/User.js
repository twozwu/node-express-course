const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true, //唯一索引
    required: [true, "Please provide email"],
    //自訂validator
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths()); //返回已修改的路徑列表。如果未修改則返回空陣列
  // console.log(this.isModified('name')); //如果修改了任何給定路徑，則返回 true，否則返回 false。如果沒有參數，true則在此文檔中的任何路徑被修改時返回。
  if (!this.isModified("password")) return; //如果沒修改密碼則返回。避免user的密碼又被加鹽一次
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
