const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    expirationDate: {
        type: String,
        required: [
            true, "you must enter an expiration date"
        ]
    },
    bidId: {
        type: Schema.Types.ObjectId,
        ref: 'Bid',
        required: [
            true, 'a bid amout must be entered'
        ],
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [
            true, 'a creator must be entered'
        ]
    },
    productId: {
        type: String,
        required: [
            true,
            'a product must be entered'
            ]
    }
})

module.exports = mongoose.model('Auction', AuctionSchema);
