const express = require("express");
const router = express.Router();


const productStatusRouter = (productStatusController) => {

    router.post('/addStatus', async (req, res, next) => {
        try{
            const newStatus = await productStatusController.createStatus(req.body);
            res.status(201).json(newStatus);
        } catch (err) {
            res.status(401).json(newStatus)
        };
        
    });



    return router;
    
}


module.exports = productStatusRouter;