class Err extends Error {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = Err;