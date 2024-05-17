const express = require("express");
const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("auction started successfully");
})



module.exports = router;