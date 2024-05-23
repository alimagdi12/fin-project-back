const express = require("express");
const router = express.Router();

const auctionWinnerRouter = (auctionWinnerController) => {
    router.post('/add-auction-winner', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const auctionWinner = await auctionWinnerController.addAuctionWinner(req.body, token);
            res.status(201).json(auctionWinner);
        } catch (err) {
            res.status(401).json(auctionWinner);
        }
    });


    // router.delete('/delete-auction-winner', async (req, res, next) => {
    //     try { 
    //         const token = req.headers['jwt'];
    //         const auction = await auctionController.deleteAuction(req.body, token);
    //         res.status(201).json(auction);
    //     }
    //     catch (err) {
    //         res.status(401).json(auction);
    //     }
    // })

    return router;
}

module.exports = auctionWinnerRouter;
