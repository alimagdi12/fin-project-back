const Category = require('../../models/category/category.model');


class CategoryRepository{
    constructor() { };


    async addCategory(title) {
        const folderName = title + new Date().toISOString().split('T')[0];
        const newCategory = new Category({
            title,
            imageUrl: { images: [] },
            folderName,

        });
        await newCategory.save();
        return newCategory
    };
    
    async getCategories() { 
        const categories = await Category.find();
        return categories;
    }

    async deleteCategory(id) {
        const category = await Category.findByIdAndDelete(id);
        return category;
    }
};


module.exports = CategoryRepository;