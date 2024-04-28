const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Email = require('../../middlewares/email');
const User = require("../../models/user/user.model");




exports.signup = async (userData) => {
    const { userName, firstName, lastName, birthDay, email, phoneNumber, imageUrl, password, confirmPassword } = userData;

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    let role = email === 'alimagdi12367@gmail.com' ? 'admin' : 'user';

    const hashedPassword = await bcrypt.hash(password, 12);

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const user = new User({
        userName,
        firstName,
        lastName,
        birthDay,
        email,
        phoneNumber,
        role,
        password: hashedPassword,
        notification: { data: [] },
    });

    await user.save();

    await Email.sendMail({
        to: email,
        from: 'shop@node-complete.com',
        subject: 'Signup succeeded!',
        html: '<h1>You successfully signed up!</h1>'
    });

    return user;
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
        "your_secret_key",
        { expiresIn: "1h" }
    );

    return token;
};
