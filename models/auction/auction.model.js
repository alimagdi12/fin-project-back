const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    expirationDate: {
        type: Date,
        required: true
    },
    bidId: {
        type: Schema.Types.ObjectId,
        ref: 'Bid',
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Auction', AuctionSchema);
