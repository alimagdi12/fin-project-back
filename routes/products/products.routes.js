const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer');


const productRouter = (productsController) => {

    router.post('/add-product', async (req, res, next) => {
        try {
            token = req.headers['jwt'];
            await upload.uploadImage(req, res);
            const product = await productsController.addProduct(token, req.body, req.files);
            res.status(201).json(product);
        } catch (err) {
            res.status(400).json(product);
        }
    })

    router.get('/get-products', async (req, res, next) => {
        try {
            const products = await productsController.getProducts();
            res.status(200).json(products);
        } catch (err) {
            res.status(400).json(products);
        }
    })


    router.get('/get-product/:id', async (req, res, next) => {
        try {
            const product = await productsController.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            res.status(400).json(product);
        }
    })

    router.put('/edit-product/:id', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const editedProduct = await productsController.editProduct(req.params.id, req.body, token);
            res.status(200).json(editedProduct);
        } catch (err) {
            res.status(400).json(editedProduct);
        }
    });

    router.delete('/delete-product/:id', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const deletedProduct = await productsController.deleteProduct(req.params.id, token);
            res.status(200).json(deletedProduct);
        } catch (err) {
            res.status(400).json({ msg: "Failed to delete product", err: err.message });
        }
    });

    return router;
    
}


module.exports = productRouter;
