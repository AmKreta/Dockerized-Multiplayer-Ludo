const mongoose = require('mongoose');

const grantedTokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: ['true', 'UserId is required for generating token']
    },
    accessTokenSecret: {
        type: String,
        required: ['true', 'access token secret is required to generate token']
    },
    refreshTokenSecret: {
        type: String,
        required: ['true', 'refresh token secret is required to generate token']
    },
    lastIssuedAccessToken: String
}, { timestamps: true });

module.exports = mongoose.model('grantedToken', grantedTokenSchema);