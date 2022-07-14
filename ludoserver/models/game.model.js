const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    playedBetween: {
        type: String,
        enum: ['group', 'strangers']
    },
    members: [mongoose.Schema.Types.ObjectId],
    wonBy: mongoose.Schema.Types.ObjectId,
    duration: {
        hours: Number,
        min: Number,
        second: Number
    },
    audiance: [mongoose.Schema.Types.ObjectId]
}, { timestamps: true });

module.exports = mongoose.model('game', gameSchema)