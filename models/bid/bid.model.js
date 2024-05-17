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
        default: function() {
            return this.initialValue; 
        }
    },
    auctionId: {
        type: Schema.Types.ObjectId,
        ref: 'Auction',
        required: [true, "An auction must be provided"]
    },
    createdAt: {
        type: Date,
        required: [true, "A date must be entered"],
        default: Date.now,
    },
    initialValue: {
        type: Number,
        required: [true, "An initial value must be entered"]
    }
});

module.exports = mongoose.model('Bid', BidSchema);
