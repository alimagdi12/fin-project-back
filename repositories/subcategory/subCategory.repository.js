const Category = require('../../models/category/category.model');
const SubCategory = require('../../models/subCategory/subCategory.model')

class SubCategoryRepository{
    constructor() { };


    async addSubCategory(body) {
        const categoryName = body.categoryName;
        const title = body.title;
        const categories = await Category.findOne({ title:categoryName });
        if (!categories) {
            throw new Error('Category not found');
        }
        const categoryId = categories._id;
        const newSubCategory = new SubCategory({ title, categoryId });
        await newSubCategory.save();
        return newSubCategory;
};

    
    async getSubCategories() {
        const subCategories = await SubCategory.find().populate('categoryId').exec();
        return subCategories;
    }


    async deleteSubCategory(id) {
        const subCategory = await SubCategory.findByIdAndDelete(id);
        return subCategory;
    }
};


module.exports = SubCategoryRepository;