const { Schema, model } = require("mongoose");

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const User = model("users", userSchema);

module.exports = User;
