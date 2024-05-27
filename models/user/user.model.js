const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [
            true,
            'You must enter a first name'
        ],
        minlength: [
            3,
            'First name must be at least 3 letters'
        ],
        maxlength: [
            15,
            'First name must be less than 15 letters'
        ]
    },
    lastName: {
        type: String,
        required: [
            true,
            'You must enter a last name'
        ],
        minlength: [
            3, 'Last name must be at least 3 letters'
        ],
        maxlength: [
            15, 'Last name must be less than 15 letters'
        ],
        validate: {
            validator: function(value) {
                return /^[a-zA-Z]+$/.test(value); // Only allow letters
            },
            message: 'Last name must contain only letters'
        }
    },
    birthDay: {
        type: String,
        required: [
            true,
            'You must enter a birthday'
        ]
    },
    email: {
        type: String,
        required: [
            true,
            'You must enter an email'
        ],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'
        ]
    },
    phoneNumber: {
        type: String,
        required: [
            true,
            'You must enter a phone number'
        ],
        validate: {
            validator: function(value) {
                return /^\d{11}$/.test(value); // Only allow 10 digits
            },
            message: 'Phone number must be 11 digits'
        }
    },
    imageUrl: {
        images: [
            {
                type: String,
                required: [
                    false
                ],
            }
        ]
    },
    folderName: {
        type: String,
            required: false
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'UserRole',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notification: {
        items: [
            {
                type: String,
                required: true
            }
        ]
    },
    userSocketId: {
        type: String,
        required: false
    }
});



UserSchema.methods.addImageUrl = function(imageUrl) {
    this.imageUrl.images.push(imageUrl);
    return this.save();
};

UserSchema.methods.deleteImageUrl = function(imageUrl) {
    this.imageUrl.images = this.imageUrl.images.filter(img => img !== imageUrl);
    return this.save();
};

UserSchema.methods.clearImageUrl = function() {
    this.imageUrl.images = [];
    // return this.save();
};

UserSchema.methods.addNotification = function(notification) {
    this.notification.items.push(notification);
    return this.save();
};

UserSchema.methods.deleteNotification = function(notification) {
    this.notification.items = this.notification.items.filter(notif => notif !== notification);
    return this.save();
};

UserSchema.methods.clearNotification = function() {
    this.notification.items = [];
    return this.save();
};



module.exports = mongoose.model('User', UserSchema);
