const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name of group is required'],
    },
    admin: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, 'id of admin is required']
    },
    members: [mongoose.Schema.Types.ObjectId]
}, { timestamps: true });

groupSchema.post('save', function (next) {
    // notify all users
})

module.exports = mongoose.model('group', groupSchema);