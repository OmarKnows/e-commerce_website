const router = require("express").Router();
const authenticationController = require("./authentication.controller");

router.post(
  "/forget-password-request",
  authenticationController.forgetPassword
);

router.post("/reset-password", authenticationController.resetPassword);

module.exports = router;
