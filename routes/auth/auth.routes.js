const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth/auth.controller");

router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.post('/test', authController.addNotification);

router.post('/remove',authController.removeNotification)
module.exports = router;
