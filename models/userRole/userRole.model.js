const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: [true, 'you must enter an user role'],
        unique: true
    }
});



module.exports = mongoose.model('UserRole', UserRoleSchema);
