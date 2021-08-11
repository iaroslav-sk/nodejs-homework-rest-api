const { Router } = require("express");

const jwtMiddelware = require("./middlewares/jwtToken.middleware");

const { auth: ctrl } = require("./controller");

const router = Router();

router.post("/register", ctrl.register);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", ctrl.missingVerify);

router.post("/login", ctrl.login);

router.get("/current", jwtMiddelware, ctrl.current);

router.get("/logout", jwtMiddelware, ctrl.logout);

module.exports = router;
