const mongoose = require('mongoose');

const friendListSchema = new mongoose.Schema({
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'sentBy id is required for creating friend request']
    },
    receivedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'receivedBy id is required for creating request']
    },
    pendind: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = new mongoose.model('friendList', friendListSchema);