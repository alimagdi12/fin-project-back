const Product = require('../../models/products/product.model');
const Category = require('../../models/category/category.model');
const SubCategory = require('../../models/subCategory/subCategory.model');
const User = require('../../models/user/user.model');
const ProductStatus = require('../../models/productStatus/productStatus.model');
const jwt = require("jsonwebtoken");



class ProductRepositry{
    constructor() { }

    async addProduct(productData , token , files) {
        try {
            const { title , categoryName, SubCategoryName, quantity, location, price , productStatus } = productData;
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
            // Check if user already exists
            const existingImage = files.length > 0;
            if (!existingImage) {
                throw new Error('at least one imagemust be exists');
            }
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
            const images = files.map(file => file.filename); 
            images.forEach(async image => {
                await product.addImageUrl(image);
            });
            await product.save();
            return product;

        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
        
    }



    async getProducts() {
        try {
            const products = await Product.find().populate('status userId categoryId subCategoryId').exec();
            return products;
        } catch (err) {
            throw new Error(err.message) ;
        }
    }


    async getProductById(id) {
        try {
            const product = await Product.findById(id).populate('status userId categoryId subCategoryId').exec();
            return product;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    


    async editProduct(id , productData , token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            const userEmail = decodedToken.email;
            console.log(userEmail.toString());
            const { updatedTitle, updatedQuantity, updatedPrice } = productData;
            const product = await Product.findById(id);
            if (userEmail.toString() !== 'alimagdi12367@gmail.com' && product.userId.toString() !== userId.toString()) {
                throw new Error('You are not authorized to edit this product');
            }

            product.title = updatedTitle;
            product.quantity = updatedQuantity;
            product.price = updatedPrice;
            await product.save();
            return product;
        } catch (err) {
            throw new Error(err.message);
        }
    }


    async deleteProduct(id,token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            const userEmail = decodedToken.email;
            const product = await Product.findById(id);
            if (userEmail.toString() !== 'alimagdi12367@gmail.com' && product.userId.toString() !== userId.toString()) {
                throw new Error('You are not authorized to edit this product');
            }
            const deletedProduct = await Product.findByIdAndDelete(id);
            return deletedProduct
        } catch (err) {
            throw new Error(err.message);
        }
    }

}


module.exports = ProductRepositry;

