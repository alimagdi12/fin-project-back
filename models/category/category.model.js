const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [
            true,
            'Please enter a category name'
        ]
        ,
        unique: true
    },
    imageUrl: {
        images: [
            {
                type: String,
                required: [
                    true
                ],
            }
        ]
    },
    folderName: {
        type: String,
        required: false
    },
})



CategorySchema.methods.addImageUrl = function(imageUrl) {
    this.imageUrl.images.push(imageUrl);
    return this.save();
};

CategorySchema.methods.deleteImageUrl = function(imageUrl) {
    this.imageUrl.images = this.imageUrl.images.filter(img => img !== imageUrl);
    return this.save();
};

CategorySchema.methods.clearImageUrl = function() {
    this.imageUrl.images = [];
    // return this.save();
};



module.exports = mongoose.model('Category', CategorySchema);
