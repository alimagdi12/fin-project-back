const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Email = require('../../middlewares/email');
const User = require("../../models/user/user.model");
const UserRole = require('../../models/userRole/userRole.model');
const fs = require('fs');

class UserRepositry {
    constructor(io) {
        this.io = io;
    };



    async getUser(token) {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found.");
            }
    return user;
    }



    async editUser(userData, token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found.");
            }

            // Check if any fields need to be updated
            const updated = (
                (userData.firstName && userData.firstName !== user.firstName ? user.firstName = userData.firstName : false) ||
                (userData.lastName && userData.lastName !== user.lastName ? user.lastName = userData.lastName : false) ||
                (userData.birthDay && userData.birthDay !== user.birthDay ? user.birthDay = userData.birthDay : false) ||
                (userData.phoneNumber && userData.phoneNumber !== user.phoneNumber ? user.phoneNumber = userData.phoneNumber : false)
            );

            // Save user if there are updates
            if (updated) {
                await user.save();
            }

            return user;
        } catch (err) {
            console.log(err);
            throw new Error(err) ;
        }
    }

    async deleteUser(token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found.");
            }

            await user.remove();

            return user;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async updateUserImage(token, files) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found.");
            }

            if (files && files.length > 0) {
                const file = files[0];

                // If the user has an existing image, delete it
                if (user.imageUrl && user.imageUrl.images && user.imageUrl.images.length > 0) {
                    const existingImage = user.imageUrl.images[0];
                    const imagePath = `./uploads/${existingImage}`;
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }

                // Save the new image in the user's folder
                const folderName = user.folderName;
                const uploadPath = `./uploads/${folderName}`;
                fs.renameSync(file.path, `${uploadPath}/${file.filename}`);

                // Update the image name in the database
                user.clearImageUrl();
                user.addImageUrl(`${file.filename}`);

                return { success: true, user };
            } else {
                return { success: false, message: 'No image provided' };
            }
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async updateSocketId(userId, socketId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found.");
            }
            user.userSocketId = socketId;
            await user.save();
            console.log('socketid saved successfully')
            this.io.emit('newUser',{user})
            return user;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async removeSocketId(socketId) {
        try {
            const user = await User.findOne({ userSocketId:socketId });
            if (!user) {
                throw new Error("User not found.");
            }
            user.userSocketId = null;
            await user.save();
            return user;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

};


module.exports = UserRepositry;
