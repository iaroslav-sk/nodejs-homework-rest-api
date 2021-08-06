const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs").promises;

const jwtMiddelware = require("./middlewares/jwtToken.middleware");
// const {
//   uploadMiddelware,
//   uploadDir,
// } = require("./middlewares/avatarMiddelvare");
const { auth: ctrl } = require("./controller");

const router = Router();

router.post(
  "/register",
  // uploadMiddelware.single("avatar"),
  // async (req, res, next) => {
  //   console.log(req.file);
  //   const { path: tempName, originalname } = req.file;
  //   const userId = uuidv4();
  //   const useDirectory = path.join(uploadDir, userId);
  //   try {
  //     await fs.mkdir(useDirectory);
  //     const fileName = path.join(useDirectory, originalname);
  //     fs.rename(tempName, fileName);
  //     const newUser = {
  //       _id: userId,
  //       avatar: fileName,
  //     };
  //     res.status(201).json({
  //       status: "success",
  //       code: 201,
  //       data: {
  //         result: newUser,
  //       },
  //     });
  //   } catch (error) {
  //     fs.unlink(tempName);
  //   }
  // },
  ctrl.register
);

router.post("/login", ctrl.login);

router.get("/current", jwtMiddelware, ctrl.current);

router.get("/logout", jwtMiddelware, ctrl.logout);

module.exports = router;
