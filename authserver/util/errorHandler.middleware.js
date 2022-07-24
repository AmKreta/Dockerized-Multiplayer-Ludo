const errCodes = require("../errCodes/errCodes");

const errorHandlerMiddleware = (err, req, res, next) => {
    const { statusCode, error, code = errCodes.INTERNAL_SERVER_ERROR } = err;
    res.status(statusCode).json({ success: false, payload: { error, ...code } });
}

module.exports = errorHandlerMiddleware;