const Product = require('../../models/products/product.model');
class ProductController {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async addProduct(req, res, next) {
        try {
            const token = req.headers['jwt'];
            const productData = req.body;
            const images = req.files.map(file => file.filename); // Get an array of all filenames
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


    
}

module.exports = ProductController;
