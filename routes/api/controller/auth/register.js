const User = require("../../models/schemas/userSchema");
const bcrypt = require("bcrypt");
const HTTP_CODES = require("../../../../helpers/httpStatusCodes");

const md5 = require("md5");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(HTTP_CODES.CONFLICT).json({
        status: "error",
        code: 409,
        message: "Already register",
      });
    }
    const salt = bcrypt.genSaltSync(15);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const address = String(email).trim().toLowerCase();

    const hash = md5(address);

    const avatarURL = `https://www.gravatar.com/avatar/${hash}`;

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    res
      .status(HTTP_CODES.CREATED)
      .json({ email, password: newUser.password, avatarURL });
  } catch (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = register;
