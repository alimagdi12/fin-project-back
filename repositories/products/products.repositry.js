const Product = require('../../models/products/product.model');
const Category = require('../../models/category/category.model');
// const SubCategory = require('../../models/subCategory/subCategory.model');



class ProductRepositry{
    constructor() { }

    async addCategory(category) {
        const newCategory = new Category({ category });
        await newCategory.save();
        return newCategory
    }

    
    
    
}


module.exports = ProductRepositry;

