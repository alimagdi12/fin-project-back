const express = require("express");
const router = express.Router();


const subCategoryRouter = (subCategoryController) => {

    router.post('/add-subcategory', async (req, res, next) => {
        try{
            const subCategory = await subCategoryController.addSubCategory(req.body);
            res.status(200).json(subCategory);
        } catch (err) {
            res.status(400).json(subCategory);
        };
        
    });

    router.get('/subcategories', async (req, res, next) => {
        try {
            const subCategories = await subCategoryController.getCategories();
            res.status(200).json(subCategories);
        } catch (err) {
            res.status(400).json(subCategories);
        }
    })

    router.delete('/delete-subcategory/:id',async (req, res, next) => {
        try {
            const deletedSubCategory = await subCategoryController.deleteSubCategory(req.params.id);
            res.status(200).json(deletedSubCategory);
        } catch (err) {
            res.status(400).json(deletedSubCategory);
        }
    });
    
    return router;
    
}


module.exports = subCategoryRouter;