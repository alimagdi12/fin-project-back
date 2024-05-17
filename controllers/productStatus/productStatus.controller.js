class ProductStatusController{
    constructor(productStatusRepository) {
        this.productStatusRepository = productStatusRepository;
    };

    async createStatus(body) {
        try {
            const newStatus = await this.productStatusRepository.createStatus(body);
            return { message: 'Product Status created successfully', status: newStatus };
        } catch (error) {
            console.error(error);
            return { message: 'Failed to create product status', error: error.message };
        }
    }
}


module.exports = ProductStatusController;