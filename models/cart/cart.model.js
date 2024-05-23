const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    productId: {
        type: ObjectID,
        ref: 'Product',
        required: [
            true,
            'Product id is required in cart'
        ]
    },
    userId: {
        type: ObjectID,
        ref: 'User',
        required: [
            true,
            'User id is required in cart'
        ]
    },
    quantity: {
        type: Number,
        required: false,
    },
})

CartSchema.methods.increaseQuantity = function(quantity){
    this.quantity = quantity;
    return this.save();
}

CartSchema.methods.decreaseQuantity = function(quantity){
    this.quantity = quantity;
    return this.save();
}

module.exports = mongoose.model('Cart', CartSchema);