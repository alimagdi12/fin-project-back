const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductStatusSchema = new Schema({
    status: {
        type: String,
        enum: ['new', 'used'],
        required: [true, 'you must enter a product status'],
        unique: true
    }
});



module.exports = mongoose.model('ProductStatus', ProductStatusSchema);
