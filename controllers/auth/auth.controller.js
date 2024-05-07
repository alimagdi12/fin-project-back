const authService = require("../../services/auth/auth.service");
const { getPublicIpMiddleware } = require("../../middlewares/location");
const geoip = require('geoip-lite');
const Email = require('../../middlewares/email');
const User = require('../../models/user/user.model');



exports.createRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        const newRole = await authService.createRole(role);
        res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create role', error: error.message });
    }
};



exports.postSignup = async (req, res, next) => {
    try {
        const result = await authService.signup(req.body);
        res.status(201).json({ msg: 'user created successfully', result });
    } catch (err) {
        console.error(err);
        res.status(500).json({msg:'failed to create user', error: err.message});
    }
};


exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const lang = req.body.lang; // Assuming lang is passed in the request body

    try {
        const token = await authService.login(email, password);

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
        return res.status(422).json({msg:'error loging in ',err:err.message});
    }
};



// exports.addNotification = async (req, res, next) => {
//     const user = '662ea5c597ec8f2d5c29c728'
//     user.addToNotification({
//         body: 's',
//     })
// }


// exports.removeNotification = async (req, res ,next) => {
//     const user = await User.findById('662d46a1c299a722709b0be1');
//     user.removeFromNotification('662d498a561d8f24c08418e1')
// }