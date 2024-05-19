const Auction = require('../../models/auction/auction.model');
const jwt = require("jsonwebtoken");

class AuctionRepository {
    constructor() {}

    async addAuction(data, token) {
        const { expirationDays, productId , initialValue} = data;
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        
        // Calculate expiration date
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
}

module.exports = AuctionRepository;
