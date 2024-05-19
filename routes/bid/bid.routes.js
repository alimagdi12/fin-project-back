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

    return router;
}

module.exports = bidRouter;
