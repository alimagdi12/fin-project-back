class ProductController {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async addProduct(token,body,files) {
        try {
            const result = await this.productRepository.addProduct(body, token,files);
            
            return { msg: 'product added successfully', result };
        } catch (err) {
            console.error(err);
            return { msg: "failed to add product", err: err.message };
        }
    }


    async getProducts() {
        try {
            const products = await this.productRepository.getProducts();
            return { msg: 'products fetched successfully', products };
        } catch (err) {
            console.error(err);
            return { msg: "failed to get products", err: err.message };
        }
    }


    async getProductById(id) {
        try {
            const product = await this.productRepository.getProductById(id);
            return { msg: 'product fetched successfully', product };
        } catch (err) {
            console.error(err);
            return { msg: "failed to get product", err: err.message };
        }
    }


    async editProduct(id, body, token) {
        try {
            const product = await this.productRepository.editProduct(id , body ,token);
            return { msg: "product edited successfully", product };
        } catch (err) {
            console.error(err);
            return { msg: "failed to edit product", err: err.message };
        }
    }

    async deleteProduct(id,token) {
        try {
            const product = await this.productRepository.deleteProduct(id, token);
            return { msg: "product deleted successfully ", product };
        } catch (err) {
            console.error(err);
            return { msg: "failed to delete product", err: err.message };
        }
    }

}

module.exports = ProductController;
