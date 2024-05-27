const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer');


const userRouter = (userController) => {
    
    router.delete('/delete-user', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const deletedUser = await userController.deleteUser(token);
            res.status(200).json(deletedUser);
        } catch (err) {
            res.status(400).json(deletedUser);
        }
    });
    
    router.put('/edit-user', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const editedUser = await userController.editUser(req.body, token);
            res.status(200).json(editedUser);
        } catch (err) {
            res.status(400).json(editedUser)
        }
    });

    
    
    router.put('/edit-user-image', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];

            // Wait for the file upload to complete
            await upload.uploadImage(req, res);
    
            // Proceed to postSignup
            const updatedUser = await userController.updateUserImage(req.files, token);
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(updatedUser);
        }
    });




    router.get('/get-user', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
    
            const User = await userController.getUser(token);
            res.status(200).json(User);
        } catch (err) {
            res.status(500).json(User);
        }
    });

    router.post('add-socketId', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
        } catch (err) {
            res.status(500).json({ message: 'Failed to add socketId' });
        }
    })
    return router;
}


module.exports = userRouter;
