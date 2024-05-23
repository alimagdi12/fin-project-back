const express = require("express");
const router = express.Router();

const cartRouter = (cartController) => {

    router.get("/cart", async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const cart = await cartController.getCart(token);
            res.status(200).json(cart);
        } catch (err) {
            res.status(401).json(cart)
        }
    });


    router.post('/add-to-cart', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const cart = await cartController.addToCart(req.body, token);
            res.status(201).json(cart);
        } catch (err) {
            res.status(401).json(cart);
        }
    });


    router.delete('/delete-cart', async (req, res, next) => {
        try { 
            const token = req.headers['jwt'];
            const cart = await cartController.deleteCart(token);
            res.status(201).json(cart);
        }
        catch (err) {
            res.status(401).json(cart);
        }
    })

    router.post('/remove-from-cart', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const cart = await cartController.removeFromCart(req.body, token);
            res.status(201).json(cart);
        } catch (err) {
            res.status(401).json(cart);
        }
        
    })

    router.post('/increase-cart-quantity', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const cart = await cartController.increaseCartQuantity(req.body, token);
            res.status(201).json(cart);
        } catch (err) {
            res.status(401).json(cart);
        }
        
    })


    router.post('/decrease-cart-quantity', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const cart = await cartController.decreaseCartQuantity(req.body, token);
            res.status(201).json(cart);
        } catch (err) {
            res.status(401).json(cart);
        }
        
    })

    return router;
}

module.exports = cartRouter;
