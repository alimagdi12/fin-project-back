const express = require("express");
const router = express.Router();

const auctionRouter = (auctionController) => {
    router.post('/add-auction', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const auction = await auctionController.addAuction(req.body, token);
            res.status(201).json(auction);
        } catch (err) {
            res.status(401).json(auction);
        }
    });


    router.delete('/delete-auction', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const auction = await auctionController.deleteAuction(req.body, token);
            res.status(201).json(auction);
        }
        catch (err) {
            res.status(401).json(auction);
        }
    });

    router.get('/get-auction-by-id/:id', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const auction = await auctionController.getAuctionById(req.params, token);
            res.status(200).json(auction);
        } catch (err) {
            res.status(401).json(auction)
        }
    })

    return router;
}

module.exports = auctionRouter;
