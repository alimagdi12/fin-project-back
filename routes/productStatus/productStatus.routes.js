const express = require("express");
const router = express.Router();


const productStatusRouter = (productStatusController) => {

    router.post('/addStatus', (req, res, next) => {
        try{
            productStatusController.createStatus(req, res, next);
        } catch (err) {
            next(err);
        };
        
    });



    return router;
    
}


module.exports = productStatusRouter;