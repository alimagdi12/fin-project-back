const Category = require('../../models/category/category.model');


class CategoryRepository{
    constructor() { };


    async addCategory(body) {
        const folderName = body.title + new Date().toISOString().split('T')[0];


        // Check if user already exists
        const existingCategory = await Category.findOne({ title:body.title });
            if (existingCategory) {
                throw new Error('categoty already exists');
        }
        

        const newCategory = await new Category({
            title: body.title,
            imageUrl:{images:[]},
            folderName,
        });
        await newCategory.save();
        return newCategory
    };
    
    async getCategoryByNameAndAddImage(title,files) {
        const category = await Category.findOne({ title });
            if (category && files && files.length > 0) {
                if (!category.imageUrl ) {
                    category.imageUrl = { images: [] };
                }
                category.addImageUrl(files[0].filename);
                return category
        }
    }


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