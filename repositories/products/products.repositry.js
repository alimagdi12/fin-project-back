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


    async getProducts() {
        try {
            const products = await Product.find().populate('status userId categoryId subCategoryId').exec();
            return products;
        } catch (err) {
            throw err;
        }
    }


    async getProductById(id) {
        try {
            const product = await Product.findById(id);
            return product;
        } catch (err) {
            throw err;
        }
    }
    


    async editProduct(productData, token, id) {
        try {
            const { updatedTitle, updatedQuantity, updatedPrice } = productData;
            const product = await Product.findById(id);
            product.title = updatedTitle;
            product.quantity = updatedQuantity;
            product.price = updatedPrice;
            await product.save();
            return product;
        } catch (err) {
            throw err;
        }
    }


    async deleteProduct(id,token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.id;
            const productAdminId = await Product.findById(id).userId;
            if (userId === productAdminId) {
                const product = await Product.findByIdAndDelete(id);
                return product
            }
        } catch (err) {
            throw err
        }
    }

}


module.exports = ProductRepositry;

