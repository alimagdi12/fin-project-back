class BidController {
    constructor(bidRepository) {
        this.bidRepository = bidRepository;
    }

    async addBid(body, token) {
        try {
            const bid = await this.bidRepository.addBid(body, token);
            
            return { message: 'Auction added successfully', bid };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    async getBid(body) {
        try {
            const bid = await this.bidRepository.getBid(body);
            return {message:'bid fetched successfully',bid}
        } catch (err) {
            console.error(err);
            return {message:err.message}
        }
    }
}

module.exports = BidController;
