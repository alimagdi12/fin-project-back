const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer');


const authRouter = (authController) => {
    
    router.post('/signup', async (req, res, next) => {
        try {
            // Wait for the file upload to complete
            await upload.uploadImage(req, res);
    
            // Proceed to postSignup
            await authController.postSignup(req, res, next);
        } catch (err) {
            next(err)
        }
    });

    
    router.post('/login', (req, res, next) => {
        try{
            authController.postLogin(req, res, next);
        } catch (err) {
            next(err)
        };
    });
    
    


    return router;
}


module.exports = authRouter;
