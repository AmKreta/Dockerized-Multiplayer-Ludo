const Router = require('express').Router();
const { generateToken, verifyToken, reassignToken, deleteToken } = require('../controller/grantedToken.controller');

Router
    .route('/')
    .get(verifyToken)
    .post(generateToken)
    .put(reassignToken)
    .delete(deleteToken);

module.exports = Router;    