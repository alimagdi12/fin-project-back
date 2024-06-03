const express = require("express");
const router = express.Router();

const bidRouter = (bidController) => {
    router.post('/add-bid', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const bid = await bidController.addBid(req.body, token);
            res.status(201).json(bid);
        } catch (err) {
            res.status(401).json(bid);
        }
    });

    router .get('/get-bids', async (req,res,next)=>{
        try {
            const bids = await bidController.getAllBids();
            res.status(200).json(bids)
        } catch (err) {
            res.status(400).json(bids);
        }
    })

    router.get('/get-bid', async (req, res, next) => {
        try {
            const bid = await bidController.getBid(req.body);
            res.status(200).json(bid)
        } catch (err) {
            res.status(400).json(bid);
        }
    })
    return router;
}

module.exports = bidRouter;
