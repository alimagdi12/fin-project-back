const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer')
const authController = require("../../controllers/auth/auth.controller");

router.post('/addRole', authController.createRole);

router.post('/signup', async (req, res, next) => {
    try {
        // Wait for the file upload to complete
        await upload.uploadImage(req, res);

        // Proceed to postSignup
        await authController.postSignup(req, res, next);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Failed to create user', error: err.message });
    }
});


router.put('/edit-user', authController.editUser);

router.delete('/delete-user', authController.deleteUser);

router.post('/login', authController.postLogin);

router.put('/edit-user-image', async (req, res, next) => {
    try {
        // Wait for the file upload to complete
        await upload.uploadImage(req, res);

        // Proceed to postSignup
        await authController.updateUserImage(req, res, next);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Failed to edit user image ', error: err.message });
    }
});

module.exports = router;
