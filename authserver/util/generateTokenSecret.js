const crypto = require('crypto');

function generateTokenSecret() {
    return crypto.randomBytes(64).toString('hex');
}

module.exports = generateTokenSecret;