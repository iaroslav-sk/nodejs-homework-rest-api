const HTTP_CODES = require("../../../../helpers/httpStatusCodes");
const User = require("../../models/schemas/userSchema");

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const candidate = await User.findOne({ verifyToken: verificationToken });

    if (!candidate) {
      return res
        .status(HTTP_CODES.UNAUTHORIZED)
        .json({ error: "Not Found, verify failed" });
    }
    await User.findOneAndUpdate(
      { _id: candidate._id },
      { verifyToken: null, verify: true }
    );
    res.status(HTTP_CODES.OK).json("Verification successful");
  } catch (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = verify;
