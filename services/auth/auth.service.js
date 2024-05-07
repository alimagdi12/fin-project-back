const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Email = require('../../middlewares/email');
const User = require("../../models/user/user.model");
const UserRole = require('../../models/userRole/userRole.model');
const upload = require('../../middlewares/multer')


// this function is used to create a new role of the user who is trying to register
exports.createRole = async (role) => {
    const newRole = new UserRole({ role });
    await newRole.save();
    return newRole;
};

exports.signup = async (userData) => {
    try {
        const { firstName, lastName, birthDay, email, phoneNumber, password, confirmPassword } = userData;
        upload.uploadImage
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

        const user = new User({
            firstName,
            lastName,
            birthDay,
            email,
            phoneNumber,
            imageUrl: { images: req.file ? req.file.filename : [] },
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
};

exports.login = async (email, password) => {
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
};
