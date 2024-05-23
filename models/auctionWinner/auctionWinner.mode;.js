const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuctionWinnerSchema = new Schema({
    auctionId: {
        type: Schema.Types.ObjectId,
        ref: 'Auction',
        required: [true,'auction id is required'],
    },
    bidId: {
        type: Schema.Types.ObjectId,
        ref: 'Bid',
        required: [true,'bid id is required']
    }
});




module.exports = mongoose.model('AuctionWinner', AuctionWinnerSchema);
