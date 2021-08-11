const register = require("./register");
const login = require("./login");
const verify = require("./verify");
const current = require("./current");
const logout = require("./logout");
const missingVerify = require("./missingVerify");

module.exports = {
  register,
  login,
  logout,
  current,
  verify,
  missingVerify,
};
