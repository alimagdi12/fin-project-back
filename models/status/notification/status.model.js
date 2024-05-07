const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificatiionStatusSchema = new Schema({
    readed: {
        type: Boolean,
        default: false
    },
    readedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('NotificationStatus', notificatiionStatusSchema);
