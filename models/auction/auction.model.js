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
    bidsId: [{
        type: Schema.Types.ObjectId,
        ref: 'Bid',
        required: false,
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: String,
        required: true,
        unique: true
    },
    initialValue: {
        type: Number,
        required: [true, "An initial value must be entered"]
    }
});


AuctionSchema.methods.addBidId = function(bidId) {
    this.bidsId.push(bidId);
    return this.save();
};

AuctionSchema.methods.deleteBidId = function(bidId) {
    this.bidsId = this.bidsId.filter(id => id !== bidId);
    return this.save();
};

module.exports = mongoose.model('Auction', AuctionSchema);
