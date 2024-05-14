const Product = require('../../models/products/product.model');
const Category = require('../../models/category/category.model');
const SubCategory = require('../../models/subCategory/subCategory.model');
const User = require('../../models/user/user.model');
const ProductStatus = require('../../models/productStatus/productStatus.model');
const jwt = require("jsonwebtoken");



class ProductRepositry{
    constructor() { }

    async addProduct(productData , token) {
        try {
            const { title , imagesUrl, categoryName, SubCategoryName, quantity, location, price , productStatus } = productData;
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await User.findOne({ email });
            const userId = user._id;
            const folderName = title + new Date().toISOString().split('T')[0];
            const category = await Category.findOne({ title: categoryName });
            const categoryId = category._id;
            const subCategory = await SubCategory.findOne({ title: SubCategoryName });
            const subCategoryId = subCategory._id;
            const status = await ProductStatus.findOne({ status: productStatus });
            const statusId = status._id;
            const product = new Product({
                title,
                imagesUrl: { images:[] },
                userId,
                categoryId,
                subCategoryId,
                quantity,
                location,
                price,
                folderName,
                status:statusId
            })
            await product.save();

        } catch (err) {
            throw err;
        }
        
    }
    
}


module.exports = ProductRepositry;

