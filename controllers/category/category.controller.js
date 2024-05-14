const Category = require('../../models/category/category.model');

class CategoryController{
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async addCategory(req, res, next){
        try {
            const { category } = req.body;
            const newCategory = await this.categoryRepository.addCategory(category);
            const categories = await Category.findOne({ title: category });
            if (categories && req.files && req.files.length > 0) {
                if (!categories.imageUrl) {
                    categories.imageUrl = { images: [] };
                }
                categories.addImageUrl(req.files[0].filename);
            }
            res.status(201).json({ message: 'category created successfully', category: newCategory });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to add category', error: err.message });
        }
    }

    async getCategories(req, res, next) {
        try {
            const categories = await this.categoryRepository.getCategories();
            res.status(200).json({ message: 'categories retrieved successfully', categories });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "failed to fetch category data", err: err.message });
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const deletedCategory = await this.categoryRepository.deleteCategory(id);
            res.status(200).json({ message: 'category deleted successfully', category: deletedCategory });
        } catch (err) {
            console.error(err);
            res.status(501).json({msg:'failed to delete product',err:err.message}) 
        }
    }
}


module.exports = CategoryController;