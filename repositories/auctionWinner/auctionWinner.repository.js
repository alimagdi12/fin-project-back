const AuctionWinner = require('../../models/auctionWinner/auctionWinner.mode;');
const Auction = require('../../models/auction/auction.mode');
const Bid = require('../../models/bid/bid.model')
const jwt = require("jsonwebtoken");

class AuctionWinnerRepository {
    constructor() {}

    async addAuctionWinner(data, token) {
        const { auctionId, bidId } = data;
        
        const auctionWinner = new AuctionWinner({ 
            auctionId, 
            bidId, 
        });

        await auctionWinner.save();
        return auctionWinner;
    }

    // async deleteAuction(data, token) {
    //     const { auctionId } = data;
    //     const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    //     const registeredUserId = decodedToken.userId;
    //     const auction = await Auction.findById(auctionId);
    //     if (!auction) throw new Error("Auction not found");
    //     if (auction.userId.toString() !== registeredUserId.toString()) throw new Error("You are not the owner of this auction");
    //     await auction.remove();
    //     return auction;
    // }
}

module.exports = AuctionWinnerRepository;
