class AuctionController {
    constructor(auctionRepository) {
        this.auctionRepository = auctionRepository;
    }

    async addAuction(body,files, token) {
        try {
            const auction = await this.auctionRepository.addAuction(body, files,token);
            
            return { message: 'Auction added successfully', auction };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    async getAuctions() {
        try { 
            const auctions = await this.auctionRepository.getAuctions();
            return {message : 'Auctions fetched successfully',auctions}
        } catch (err) {
            console.error(err);
            return {message:err.message}
        }
    }

    async deleteAuction(body, token) {
        try { 
            const auction = await this.auctionRepository.deleteAuction(body, token);
            return {message:'auction deleted successfully',auction}
        }
        catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    async getAuctionById(body, token) {
        try {
            const auction = await this.auctionRepository.getAuctionById(body, token);
            return { message: 'Auction fetched successfully', auction };
        } catch (err) {
            console.error(err);
            return { message: err.message }
        }
    }

    async getHeighstBid(body, token) {
        try {
            const bid = await this.auctionRepository.getHighestBid(body, token);
            return { message: 'Highest bid fetched successfully', bid };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }
}

module.exports = AuctionController;
