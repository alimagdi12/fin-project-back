const { getPublicIpMiddleware } = require("../../middlewares/location");
const geoip = require('geoip-lite');
const Email = require('../../middlewares/email');
const User = require('../../models/user/user.model');
const jwt = require("jsonwebtoken");
const fs = require('fs');

class UserController {
    constructor(userRepositry) {
        this.userRepositry = userRepositry;
    }


    async editUser(req, res, next) {
        try {
            const token = req.headers['jwt'];
            const result = await this.userRepositry.editUser(req.body, token);
            res.status(201).json({ message: 'user edited successfully', result });
        } catch (error) {
            console.log(error);
            res.status(401).json({ msg: 'failed to edit user', error: error.message });
        }
    }

    async deleteUser(req, res, next) {
        try {
            const token = req.headers['jwt'];
            const result = await this.userRepositry.deleteUser(token);
            res.status(201).json({ message: 'user deleted successfully', result });
        } catch (err) {
            console.log(err);
            res.status(200).json({ msg: err.message })
        }
    }

    async updateUserImage(req, res, next) {
        try {
            const token = req.headers['jwt'];
            const result = await this.userRepositry.updateUserImage(token, req.files);
            res.status(201).json({ message: 'user image updated successfully', result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Error updating image', error: err.message });
        }
    }
}

module.exports = UserController;
