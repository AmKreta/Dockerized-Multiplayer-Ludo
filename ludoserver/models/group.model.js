const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name of group is required'],
        unique: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'id of admin is required']
    },
    members: [mongoose.Schema.Types.ObjectId]
}, { timestamps: true });

module.exports = new mongoose.model('group', groupSchema);