const Auction = require('../../models/auction/auction.model');
const ProductStatus = require('../../models/productStatus/productStatus.model');
const jwt = require("jsonwebtoken");

class AuctionRepository {
    constructor() {}

    async addAuction(data,files, token) {
        const { expirationDays , initialValue , title , imagesUrl, categoryId, quantity, location , productStatus} = data;
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        
        const expirationDate = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);
        const folderName = title + new Date().toISOString().split('T')[0];
        const status = await ProductStatus.findOne({ status: productStatus });
        const statusId = status._id;

        const auction = new Auction({ 
            expirationDate, 
            userId,
            title,
            initialValue,
            folderName,
            categoryId,
            quantity,
            location,
            status:statusId
        });

        await auction.save();
        return auction;
    }


    async getAuctions() {
        const auctions = await Auction.find().populate('userId', 'username').populate('categoryId').exec();
        if (!auctions) throw new Error('no auctions found');
        return auctions;
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
        const auction = await Auction.findById(id).populate('productId bidsId categoryId').exec();
        console.log(auction);
        if (!auction) throw new Error("Auction not found");
        return auction;
    }

    async getHighestBid(data, token) {
        const id = data.id;
        const auction = await Auction.findById(id).populate('bidsId categoryId').exec();

        if (!auction) throw new Error("Auction not found");
        if (!auction.bidsId || auction.bidsId.length === 0) throw new Error("No bids found for this auction");

        const highestBid = auction.bidsId.reduce((max, current) => {
            return current.amount > max.amount ? current : max;
        }, auction.bidsId[0]);

        return highestBid;
    }




}

module.exports = AuctionRepository;
