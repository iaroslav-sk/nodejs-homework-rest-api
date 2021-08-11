const HTTP_CODES = require("../../../../helpers/httpStatusCodes");
const User = require("../../models/schemas/userSchema");
const sendMail = require("../../sgMail/sendGrid");
const { uuid } = require("uuidv4");

const missingVerify = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(HTTP_CODES.BAD_REQUEST)
        .json({ message: "missing required field email" });
    }
    const candidate = await User.findOne({ email });

    if (!candidate) {
      return res
        .status(HTTP_CODES.UNAUTHORIZED)
        .json({ error: "Not Found, verify failed" });
    }

    const { verify } = candidate;

    if (verify) {
      return res
        .status(HTTP_CODES.BAD_REQUEST)
        .json({ message: "Verification has already been passed" });
    }
    const verifyToken = uuid();
    sendMail(
      email,
      "This is a verify message!",
      "Please accept your email",
      `<h2>/users/verify/${verifyToken}</h2>`
    );
    await User.findOneAndUpdate({ email }, { verifyToken });

    res.status(HTTP_CODES.OK).json(`Verification key send on ${email}`);
  } catch (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = missingVerify;
