const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    title: {
        type: String,
        required: [
            true,
            'Please enter a subCategory name'
        ]
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [
            true,
            'Please enter a subCategory'
        ]
    }
})


module.exports = mongoose.model('SubCategory', SubCategorySchema);
