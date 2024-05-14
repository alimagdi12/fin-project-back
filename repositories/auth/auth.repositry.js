const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Email = require('../../middlewares/email');
const User = require("../../models/user/user.model");
const UserRole = require('../../models/userRole/userRole.model');

class AuthRepositry {
    constructor() { };


    async signup(userData) {
        try {
            const { firstName, lastName, birthDay, email, phoneNumber, password, confirmPassword } = userData;

            if (!password || !confirmPassword) {
                throw new Error('Passwords are required');
            }

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const userRole = await UserRole.find();

            if (!userRole) {
                throw new Error('Role not found');
            }

            const role = email === 'alimagdi12367@gmail.com' ? userRole[0]._id : userRole[1]._id;

            const hashedPassword = await bcrypt.hash(password, 12);

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                throw new Error('Email already exists');
            }

            const folderName = firstName + new Date().toISOString().split('T')[0];
            const user = new User({
                firstName,
                lastName,
                birthDay,
                email,
                phoneNumber,
                imageUrl: { images: [] },
                folderName,
                role,
                password: hashedPassword,
                notification: { items: [] },
            });

            await user.save();

            await Email.sendMail({
                to: email,
                from: 'shop@node-complete.com',
                subject: 'Signup succeeded!',
                html: '<h1>You successfully signed up!</h1>'
            });

            return user;
        } catch (err) {
            throw err;
        }
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password.");
        }

        console.log("User:", user);

        if (!user.password) {
            throw new Error("User password is missing.");
        }

        const doMatch = await bcrypt.compare(password, user.password);
        if (!doMatch) {
            throw new Error("Invalid email/phone number or password.");
        }

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString(),
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        return token;
    }

    
}

module.exports = AuthRepositry;
