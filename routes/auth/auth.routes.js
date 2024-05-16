const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer');  // Import middleware for file uploads
const { getPublicIpMiddleware } = require("../../middlewares/location");  // Import middleware for getting public IP
const geoip = require('geoip-lite');  // Import GeoIP library for IP-based geolocation
const Email = require('../../middlewares/email');  // Import middleware for sending emails

const authRouter = (authController) => {
    
    // Route for user signup
    router.post('/signup', async (req, res, next) => {
        try {
            body = req.body;
            files = req.files;
            // Wait for the file upload to complete
            await upload.uploadImage(req, res);

            // Call postSignup method in AuthController and capture the return value
            const signupResult = await authController.postSignup(req.body,req.files);

            // Send the result in the response
            res.status(200).json(signupResult);
        } catch (err) {
            res.status(400).json({ signupResult, err: err.message });
        }
    });

    // Route for user login
    router.post('/login', async (req, res, next) => {
        try {
            // Call postLogin method in AuthController and capture the return value
            const user = await authController.postLogin(req.body);

            // Get the language from the request body
            const lang = req.body.lang;

            // Call getPublicIpMiddleware to get the public IP and location data
            getPublicIpMiddleware(req, res, lang, async () => {
                console.log("Public IP:", req.publicIp);
                console.log("Location:", req.location);

                // Get location data based on the public IP and language
                const locationData = req.location && req.location.ll ? geoip.lookup(req.publicIp, lang) : null;

                // Send the location data to the user's email
                await Email.sendMail({
                    to: req.body.email,
                    from: 'shop@node-complete.com',
                    subject: 'Location Information',
                    html: `<h1>a new login attempt near: ${locationData.country} ,  ${locationData.city} if it's not you please contact us</h1>`
                });

                // Send the user data, public IP, location data, and language in the response
                res
                    .header({ jwt: user })
                    .cookie("token", user, { maxAge: 3600000, httpOnly: true })
                    .status(200)
                    .json({ user, publicIp: req.publicIp, location: locationData, lang });
            });

        } catch (err) {
            // Send an error response if login fails
            res.status(400).json({user})
        };
    });

    return router;
}

module.exports = authRouter;  // Export the authRouter function
