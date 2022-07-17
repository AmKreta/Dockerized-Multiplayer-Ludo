const errorHandlerMiddleware = (err, req, res, next) => {
    const { statusCode, error } = err;
    res.status(statusCode).json({ success: false, payload: { error } });
}

module.exports = errorHandlerMiddleware;