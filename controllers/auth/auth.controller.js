const { getPublicIpMiddleware } = require("../../middlewares/location");
const geoip = require('geoip-lite');
const Email = require('../../middlewares/email');
const User = require('../../models/user/user.model');
const jwt = require("jsonwebtoken");
const fs = require('fs');

class AuthController {
    constructor(authRepositry) {
        this.authRepositry = authRepositry;
    }


    async postSignup(req, res, next) {
        try {
            const result = await this.authRepositry.signup(req.body);

            const user = await User.findOne({ email: req.body.email });
            if (user && req.files && req.files.length > 0) {
                if (!user.imageUrl) {
                    user.imageUrl = { images: [] };
                }

                user.addImageUrl(req.files[0].filename);
            
            }

            res.status(201).json({ msg: 'user created successfully', result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'failed to create user', error: err.message });
        }
    }

    async postLogin(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        const lang = req.body.lang; // Assuming lang is passed in the request body

        try {
            const token = await this.authRepositry.login(email, password);

            // Use the middleware to get the public IP before sending the response
            getPublicIpMiddleware(req, res, async () => {
                console.log("Public IP:", req.publicIp);
                console.log("Location:", req.location);

                const locationData = req.location && req.location.ll ? geoip.lookup(req.publicIp, lang) : null;

                // Send the location data to the user's email
                await Email.sendMail({
                    to: email,
                    from: 'shop@node-complete.com',
                    subject: 'Location Information',
                    html: `<h1>a new login attempt near: ${locationData.country} ,  ${locationData.city} if it's not you please contact us</h1>`
                });

                res
                    .header({ jwt: token })
                    .cookie("token", token, { maxAge: 3600000, httpOnly: true })
                    .status(200)
                    .json({ msg: "user logged in successfully", token, publicIp: req.publicIp, location: locationData, lang });
            });
        } catch (err) {
            console.error(err);
            return res.status(422).json({ msg: 'error loging in ', err: err.message });
        }
    }

    
}

module.exports = AuthController;
