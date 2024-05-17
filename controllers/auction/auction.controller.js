class AuctionController {
    constructor(auctionRepository) {
        this.auctionRepository = auctionRepository;
    }

    async addAuction(body, token) {
        try {
            const auction = await this.auctionRepository.addAuction(body, token);
            return { message: 'Auction added successfully', auction };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }
}

module.exports = AuctionController;
