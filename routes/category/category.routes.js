const express = require("express");
const router = express.Router();


const categoryRouter = (categoryController) => {

    router.post('/add-category', (req, res, next) => {
        try{
            categoryController.addCategory(req, res, next);
        } catch (err) {
            next(err);
        };
        
    });

    router.get('/categories', (req, res, next) => {
        try {
            categoryController.getCategories(req,res,next)
        } catch (err) {
            next(err)
        }
    })

    router.delete('/delete-category/:id', (req, res, next) => {
        try {
            categoryController.deleteCategory(req, res, next)
        } catch (err) {
            next(err)
        }
    })
    
    return router;
    
}


module.exports = categoryRouter;