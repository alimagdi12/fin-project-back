const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    birthDay:{
        type:Date,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    imageUrl: {
        type: String,
        required:false
    },
    role: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    notification: {
        data: [
                {
                reference: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                },
                status: {
                    type: String,
                    required: true
                }
        }
        ]
    },
    notificationQuantity: {
        type: Number,
        required: true,
        default:0
    },
});

userSchema.methods.addToNotification = function(notificationData) {
    let newQuantity = 1;
    const updatedNotifications = [...this.notification.data];
    updatedNotifications.push({
        reference: notificationData.reference,
        date: new Date(),
        status: notificationData.status
    });
    
    this.notification.data = updatedNotifications;
    this.notificationQuantity += newQuantity;
    return this.save();
};

userSchema.methods.removeFromNotification = function(notificationId) {
    const updatedNotifications = this.notification.data.filter(notification => {
        return notification._id.toString() !== notificationId.toString();
    });
    this.notification.data = updatedNotifications;
    if (this.notificationQuantity > 0) {
        this.notificationQuantity -= 1;
    } else {
        this.notificationQuantity = 0;
    }
    return this.save();
};


userSchema.methods.clearNotification = function() {
    this.notification.data = [];
    return this.save();
};

module.exports = mongoose.model('User', userSchema);
