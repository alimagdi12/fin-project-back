const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer');


const productRouter = (productsController) => {

    router.post('/add-product', async (req, res, next) => {
        try {
            await upload.uploadImage(req, res);
            productsController.addProduct(req, res, next);
        }catch (err) {
            next(err);
        }
    })



    return router;
    
}


module.exports = productRouter;
