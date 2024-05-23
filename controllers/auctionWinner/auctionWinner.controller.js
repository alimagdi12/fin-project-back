class AuctionWinnerController {
    constructor(auctionWinnerRepository) {
        this.auctionWinnerRepository = auctionWinnerRepository;
    }

    async addAuctionWinner(body, token) {
        try {
            const auctionWinner = await this.auctionRepository.addAuction(body, token);
            
            return { message: 'Auction added successfully', auctionWinner };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    // async deleteAuction(body, token) {
    //     try { 
    //         const auction = await this.auctionRepository.deleteAuction(body, token);
    //         return {message:'auction deleted successfully',auction}
    //     }
    //     catch (err) {
    //         console.error(err);
    //         return { message: err.message };
    //     }
    // }
}

module.exports = AuctionWinnerController;
