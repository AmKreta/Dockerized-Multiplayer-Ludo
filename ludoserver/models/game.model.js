const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    members: [mongoose.Schema.Types.ObjectId],
    wonBy: mongoose.Schema.Types.ObjectId,
    audiance: [mongoose.Schema.Types.ObjectId]
}, { timestamps: true });

module.exports = mongoose.model('game', gameSchema)