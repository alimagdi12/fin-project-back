const ProductStatus = require('../../models/productStatus/productStatus.model');



class ProductStatusRepository{
    constructor() { };


    async createStatus(status){ 
        const newStatus = new ProductStatus({ status });
        await newStatus.save();
        return newStatus;
    };

}

module.exports = ProductStatusRepository;