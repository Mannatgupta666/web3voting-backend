const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    hasVoted: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
