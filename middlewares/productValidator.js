const mongoose = require('mongoose');

const validateProductData = (req, res, next) => {
    const { title, status, imagesUrl, folderName, addingDate, userId, price, categoryId, subCategoryId, quantity, location } = req.body;

    // Validate title
    if (!title || typeof title !== 'string' || title.length < 3 || title.length > 25) {
        return res.status(400).json({ message: 'Invalid product title' });
    }

    // Validate status
    if (!status || !mongoose.Types.ObjectId.isValid(status)) {
        return res.status(400).json({ message: 'Invalid product status' });
    }

    // Validate imagesUrl
    if (!imagesUrl || !Array.isArray(imagesUrl.images) || imagesUrl.images.length === 0) {
        return res.status(400).json({ message: 'Invalid product images' });
    }

    // Validate folderName
    if (!folderName || typeof folderName !== 'string') {
        return res.status(400).json({ message: 'Invalid folder name' });
    }

    // Validate addingDate (optional)

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Validate price
    if (!price || typeof price !== 'number' || isNaN(price)) {
        return res.status(400).json({ message: 'Invalid product price' });
    }

    // Validate categoryId
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: 'Invalid category ID' });
    }

    // Validate subCategoryId
    if (!subCategoryId || !mongoose.Types.ObjectId.isValid(subCategoryId)) {
        return res.status(400).json({ message: 'Invalid subcategory ID' });
    }

    // Validate quantity
    if (!quantity || typeof quantity !== 'number' || isNaN(quantity)) {
        return res.status(400).json({ message: 'Invalid product quantity' });
    }

    // Validate location
    if (!location || typeof location !== 'string') {
        return res.status(400).json({ message: 'Invalid product location' });
    }

    // If all data is valid, move to the next middleware
    next();
};

module.exports = validateProductData;
