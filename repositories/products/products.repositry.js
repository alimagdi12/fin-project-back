const ProductStatus = require('../../models/productStatus/productStatus.model');

exports.createStatus = async (status) => {
    const newStatus = new ProductStatus({ status });
    await newStatus.save();
    return newStatus;
};

