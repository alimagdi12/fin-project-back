 Auction = require('../../models/auction/auction.model');
const jwt = require("jsonwebtoken");

class AuctionRepository {
    constructor() {}

    async addAuction(data, token) {
        const { expirationDays, productId , initialValue} = data;
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        
        const expirationDate = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);

        const auction = new Auction({ 
            expirationDate, 
            productId, 
            userId,
            initialValue
        });

        await auction.save();
        return auction;
    }

    async deleteAuction(data, token) {
        const { auctionId } = data;
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const registeredUserId = decodedToken.userId;
        const auction = await Auction.findById(auctionId);
        if (!auction) throw new Error("Auction not found");
        if (auction.userId.toString() !== registeredUserId.toString()) throw new Error("You are not the owner of this auction");
        await auction.remove();
        return auction;
    }

    async getAuctionById(data, token) {
        const id = data.id;
        const auction = await Auction.findById(id).populate('productId bidsId').exec();
        console.log(auction);
        if (!auction) throw new Error("Auction not found");
        return auction;
    }

    async getHighestBid(data, token) {
        const id = data.id;
        const auction = await Auction.findById(id).populate('bidsId').exec();

        if (!auction) throw new Error("Auction not found");
        if (!auction.bidsId || auction.bidsId.length === 0) throw new Error("No bids found for this auction");

        const highestBid = auction.bidsId.reduce((max, current) => {
            return current.amount > max.amount ? current : max;
        }, auction.bidsId[0]);

        return highestBid;
    }


}

module.exports = AuctionRepository;
