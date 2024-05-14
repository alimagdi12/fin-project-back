const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer');


const categoryRouter = (categoryController) => {

    router.post('/add-category', async (req, res, next) => {
        try {
            await upload.uploadImage(req, res);
            await categoryController.addCategory(req, res, next);
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