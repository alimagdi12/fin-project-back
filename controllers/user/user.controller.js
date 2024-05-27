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


    async editUser(body,token) {
        try {
            const result = await this.userRepositry.editUser(body, token);
            return { message: 'user edited successfully', result };
        } catch (error) {
            console.log(error);
            return { msg: 'failed to edit user', error: error.message };
        }
    }

    async deleteUser(token) {
        try {
            const result = await this.userRepositry.deleteUser(token);
            return { message: 'user deleted successfully', result };
        } catch (err) {
            console.log(err);
            return { msg: err.message };
        }
    }



async getUser(token){
    try {
        console.log(token);
        const result = await this.userRepositry.getUser(token);
        return { message: 'user fetched successfully', result } ;
    } catch (err) {
        console.error(err);
        return { msg: 'Error fetching user', error: err.message };
    }
}

    async updateUserImage(files,token) {
        try {
            const result = await this.userRepositry.updateUserImage(token,files);
            return { message: 'user image updated successfully', result } ;
        } catch (err) {
            console.error(err);
            return { msg: 'Error updating image', error: err.message };
        }
    }

    async handleSocketConnection(userId, socketId) {
        try {
            const user = await this.userRepositry.updateSocketId(userId, socketId);
            return user;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async handleSocketDisconnection(socketId) {
        try {
            const user = await this.userRepositry.removeSocketId(socketId);
            return user;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
}

module.exports = UserController;
