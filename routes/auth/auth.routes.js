const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth/auth.controller");
const upload = require('../../middlewares/multer')

// router.post('/upload', authService.uploadImage);

router.post('/addRole', authController.createRole);

router.post('/signup' ,authController.postSignup);

router.post('/login', authController.postLogin);

module.exports = router;
