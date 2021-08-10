const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs").promises;
const router = Router();
const {
  uploadMiddelware,
  uploadDir,
} = require("./middlewares/avatarMiddelvare");

router.patch(
  "/avatars",
  uploadMiddelware.single("avatar"),
  async (req, res, next) => {
    const { path: tempName, originalname } = req.file;
    const userId = uuidv4();
    const useDirectory = path.join(uploadDir, userId);
    try {
      await fs.mkdir(useDirectory);
      const fileName = path.join(useDirectory, originalname);
      fs.rename(tempName, fileName);
      const newUser = {
        _id: userId,
        avatar: fileName,
      };
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          result: newUser,
        },
      });
    } catch (error) {
      fs.unlink(tempName);
    }
  }
);

module.exports = router;
