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

    router.get('/get-products', async (req, res, next) => {
        try {
            await productsController.getProducts(req, res, next);
        } catch (err) {
            next(err)
        }
    })


    router.get('/get-product/:id', async (req, res, next) => {
        try {
            await productsController.getProductById(req, res, next);
        } catch (err) {
            next(err);
        }
    })

    router.put('/edit-product/:id', async (req, res, next) => {
        try {
            await productsController.editProduct(req, res, next);
        } catch (err) {
            next(err);
        }
    });

    router.delete('/delete-product/:id', async (req, res, next) => {
        try {
            await productsController.deleteProduct(req, res, next);
        } catch (err) {
            next(err);
        }
    })

    return router;
    
}


module.exports = productRouter;
