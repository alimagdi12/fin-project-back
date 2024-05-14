const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer');


const userRouter = (userController) => {
    
    router.delete('/delete-user', (req, res, next) => {
        try {
            
            userController.deleteUser(req, res, next);

        } catch (err) {
            next(err)
        }
    });
    
    router.put('/edit-user', (req, res, next) => {
        try {

            userController.editUser(req, res, next);
            
        } catch (err) {
            next(err)
        }
    });

    
    
    router.put('/edit-user-image', async (req, res, next) => {
        try {
            // Wait for the file upload to complete
            await upload.uploadImage(req, res);
    
            // Proceed to postSignup
            await userController.updateUserImage(req, res, next);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Failed to edit user image ', error: err.message });
        }
    });


    return router;
}


module.exports = userRouter;
