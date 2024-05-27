const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
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
            'First name must be less than 25 letters'
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
                    false,
                    "you must enter at least one image"
                ],
            }
        ]
    },
    folderName: {
        type: String,
        required: [
            true,
            "you must enter a folder name"
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
    // subCategoryId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "SubCategory",
    //     required: [
    //         true,
    //         "you must enter a sub category"
    //     ]
    // },
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


ProductSchema.methods.addImageUrl = async function(imageUrl) {
    this.imagesUrl.images.push(imageUrl);
    // await this.save(); // Save the document after all images are added
    // return this;
};


ProductSchema.methods.deleteImageUrl = function(imageUrl) {
    this.imagesUrl.images = this.imagesUrl.images.filter(img => img !== imageUrl);
    return this.save();
};

ProductSchema.methods.clearImageUrl = function() {
    this.imagesUrl.images = [];
    // return this.save();
};



module.exports = mongoose.model('Product', ProductSchema);
