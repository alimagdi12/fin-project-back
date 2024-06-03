const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer');



const auctionRouter = (auctionController) => {
    router.post('/add-auction', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            await upload.uploadImage(req, res);
            const auction = await auctionController.addAuction(req.body,req.files, token);
            res.status(201).json(auction);
        } catch (err) {
            res.status(401).json(auction);
        }
    });


    router.get('/get-auctions', async (req, res, next) => {
        try {
            const auctions = await auctionController.getAuctions();
            res.status(200).json(auctions);
        } catch (err) {
            res.status(401).json(auction)
        }
    })


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

    router.get('/get-heighst-bid/:id', async (req, res, next) => {
    try {
        const token = req.headers['jwt'];
        const bid = await auctionController.getHeighstBid(req.params, token); // Fixed method call
        res.status(200).json(bid);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});


    return router;
}

module.exports = auctionRouter;
