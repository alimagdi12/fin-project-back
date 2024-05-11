const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer');
const productsController = require('../../controllers/products/products.controller');


router.post('/addStatus', productsController.createRole);

module.exports = router;
