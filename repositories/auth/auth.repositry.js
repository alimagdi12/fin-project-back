const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();  // Load environment variables from .env file
const Email = require('../../middlewares/email');
const User = require("../../models/user/user.model");
const UserRole = require('../../models/userRole/userRole.model');

class AuthRepositry {
    constructor() { };

    // Function to sign up a new user
    async signup(userData) {
        try {
            // console.log(userData);
            const { firstName, lastName, birthDay, email, phoneNumber, password, confirmPassword } = userData;

            // Check if passwords are provided and match
            if (!password || !confirmPassword) {
                throw new Error('Passwords are required');
            }
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Find user role
            const userRole = await UserRole.find();
            if (!userRole) {
                throw new Error('Role not found');
            }

            // Set role based on email
            const role = email === 'alimagdi12367@gmail.com' ? userRole[0]._id : userRole[1]._id;

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already exists');
            }

            // Create a new user
            const folderName = email + new Date().toISOString().split('T')[0];
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

            // Save the user
            await user.save();

            // Send a confirmation email
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

    // Function to log in a user
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password.");
        }

        // Check if user password is missing
        if (!user.password) {
            throw new Error("User password is missing.");
        }

        // Compare the passwords
        const doMatch = await bcrypt.compare(password, user.password);
        if (!doMatch) {
            throw new Error("Invalid email/phone number or password.");
        }

        // Create and return a JWT token
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString(),
            },
            process.env.JWT_SECRET,  // Secret key for signing the token
            { expiresIn: "1h" }       // Token expiration time
        );
        
        return token;
    }

    // Function to find a user by email and add an image
    async findUserByEmailAndAddImage(email, files) {
        const user = await User.findOne({ email });
        if (user && files && files.length > 0) {
            if (!user.imageUrl) {
                user.imageUrl = { images: [] };
            }

            user.addImageUrl(files[0].filename);  // Add the image file name to the user's image URL array
        }
        return user;
    }
}

module.exports = AuthRepositry;
