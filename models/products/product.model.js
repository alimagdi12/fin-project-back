const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [
            true,
            'You must enter a product name'
        ],
        minlength: [
            3,
            'First name must be at least 3 letters'
        ],
        maxlength: [
            20,
            'First name must be less than 15 letters'
        ]
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'ProductStatus',
        required: true
    },
    imagesUrl: {
        images: [
            {
                type: String,
                required: [
                    true,
                    "you must enter at least one image"
                ],
            }
        ]
    },
    addingDate: {
        type: Date,
        default: Date.now,
        required: [
            true,
            "a date must be entered automatically"
        ]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [
            true,
            "a user id must be entered automatically"
        ]
    },
    price: {
        type: Number,
        required: [
            true,
            'You must enter a product price'
        ],
        validate: {
            validator: function (value) {
                // Check if the value is a number
                return typeof value === 'number' && !isNaN(value);
            },
            message: 'Price must be a number'
        }
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [
            true,
            "you must enter a category"
        ]
    },
    subCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
        required: [
            true,
            "you must enter a sub category"
        ]
    },
    quantity: {
        type: Number,
        required: [
            true,
            'You must enter a product quantity'
        ],
        validate: {
            validator: function (value) {
                // Check if the value is a number
                return typeof value === 'number' && !isNaN(value);
            },
            message: 'quantity must be a number'
        }
    },
    location: {
        type: String,
        required: [
            true,
            'You must enter a product location'
        ]
    }


})

module.exports = mongoose.model('Product', ProductSchema);
