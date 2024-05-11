const productServices = require('../../repositories/products/products.repositry');


exports.createRole = async (req, res, next) => {
    try {
        const { status } = req.body;
        const newStatus = await productServices.createStatus(status);
        res.status(201).json({ message: 'Product Status created successfully', status: newStatus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create product status', error: error.message });
    }
};