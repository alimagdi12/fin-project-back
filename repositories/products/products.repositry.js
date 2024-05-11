const ProductStatus = require('../../models/productStatus/productStatus.model');




class ProductRepositry{
    constructor() { }
    
    async createStatus(status){ 
        const newStatus = new ProductStatus({ status });
        await newStatus.save();
        return newStatus;
    };
    
}


module.exports = ProductRepositry;

