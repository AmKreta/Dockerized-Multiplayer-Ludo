const mongoose = require('mongoose');

const grantedTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
});

module.exports = grantedTokenSchema;