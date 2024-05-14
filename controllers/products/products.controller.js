const Product = require('../../models/products/product.model');
class ProductController {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async addProduct(req, res, next) {
        try {
            const token = req.headers['jwt'];
            const productData = req.body;
            const images = req.files.map(file => file.filename); 
            const product = await this.productRepository.addProduct(productData, token);
            const products = await Product.findOne({ title: req.body.title });
            images.forEach(async image => {
                await products.addImageUrl(image);
            });
            await products.save();
            res.status(201).json({ msg: 'product added successfully', product });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "failed to add product", err: err.message });
        }
    }


    async getProducts(req, res, next) {
        try {
            const products = await this.productRepository.getProducts();
            res.status(200).json({ msg: 'products fetched successfully', products });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "failed to get products", err: err.message });
        }
    }


    async getProductById(req, res, next) {
        try {
            const productId = req.params.id;
            const product = await this.productRepository.getProductById(productId);
            res.status(200).json({ msg: 'product fetched successfully', product });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "failed to get product", err: err.message });
        }
    }


    async editProduct(req, res, next) {
        try {
            const productId = req.params.id;
            const productData = req.body;
            const token = req.headers['jwt'];
            const product = await this.productRepository.editProduct(productData, token, productId);
            res.status(200).json({msg:"product edited successfully",product})
        } catch (err) {
            console.error(err);
            res.status(501).json({ msg: "failed to edit product", err: err.message });
        }
    }

}

module.exports = ProductController;
