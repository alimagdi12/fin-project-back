const Category = require('../../models/category/category.model');


class CategoryRepository{
    constructor() { };


    async addCategory(title) {
        const newCategory = new Category({ title });
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