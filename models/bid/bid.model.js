const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BidSchema = new Schema({
    biderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "A user must be provided"]
    },
    amount: {
        type: Number,
        required: [true, "An amount must be provided"],
    },
    auctionId: {
        type: Schema.Types.ObjectId,
        ref: 'Auction',
        required: false
    },
    createdAt: {
        type: Date,
        required: [true, "A date must be entered"],
        default: Date.now,
    },
    
});

BidSchema.methods.setAuctionId = function(auctionId) {
    this.auctionId = auctionId;
    return this.save();
};



module.exports = mongoose.model('Bid', BidSchema);
