const express = require("express");
const router = express.Router();


const subCategoryRouter = (subCategoryController) => {

    router.post('/add-subcategory', (req, res, next) => {
        try{
            subCategoryController.addSubCategory(req, res, next);
        } catch (err) {
            next(err);
        };
        
    });

    router.get('/subcategories', (req, res, next) => {
        try {
            subCategoryController.getCategories(req,res,next)
        } catch (err) {
            next(err)
        }
    })

    router.delete('/delete-subcategory/:id', (req, res, next) => {
        try {
            subCategoryController.deleteSubCategory(req, res, next);
        } catch (err) {
            next(err);
        }
    });
    
    return router;
    
}


module.exports = subCategoryRouter;