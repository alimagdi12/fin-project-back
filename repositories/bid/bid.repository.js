const jwt = require("jsonwebtoken");
const Auction = require('../../models/auction/auction.model');
const Bid = require('../../models/bid/bid.model')

class BidRepository {
    constructor(io) {
        this.io = io;
    }
    async addBid(data, token) {
        const { amount, productId } = data;
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const auction = await Auction.findOne({ productId }).populate('bidsId').exec();

        if (!auction) {
            return {msg:"no auction available"}
        }

        if (auction.bidsId.length === 0) {
            if (amount <= auction.initialValue) {
                return { msg: 'Bid amount must be higher than the initial value' };
            }
            
        } else {
            for (const bid of auction.bidsId) {
                if (amount <= bid.amount) {
                    return { msg: 'Bid amount must be higher than the current highest bid' };
                }
            }
        }

        const newBid = new Bid({ 
            biderId: userId, 
            amount, 
            auctionId: auction._id
        });

        await newBid.save();
        await auction.addBidId(newBid._id);

        // Emit the new bid amount to all connected clients
        this.io.emit('newBid', { amount });

        return newBid;
    }
}

module.exports = BidRepository;
