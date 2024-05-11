const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer');


const productRouter = (productsController) => {

    router.post('/addStatus', (req, res, next) => {
        try{
            productsController.createRole(req, res, next);
        } catch (err) {
            next(err);
        };
        
    });



    return router;
    
}


module.exports = productRouter;
