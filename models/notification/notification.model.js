const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationModel = new Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'NotificationStatus',
        required: true
    },
    userID: {
        ids: [],
    }
});

notificationModel.methods.addToUser = function () {
    this.userID.ids.push(this.userID.ids.length + 1);

    return this.save();
}

notificationModel.methods.deleteFromUser = function (userID) {
    const upddatedUser = this.userID.filter(item => {
        return item.userID.toString() !== userID.toString();
    });
    this.userID = upddatedUser;
    return this.save();
}

notificationModel.methods.clearFromUser = function () {
    
    const upddatedUser = [];
    this.userID = upddatedUser;
    return this.save;
    
}
module.exports = mongoose.model('Notification', notificationModel);