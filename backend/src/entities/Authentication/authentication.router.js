const router = require("express").Router();
const authenticationController = require("./authentication.controller");

router.post("/register", authenticationController.signUp);

router.post("/login", authenticationController.signIn);

module.exports = router;
