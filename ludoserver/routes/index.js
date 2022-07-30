const Router = require('express').Router();
const gameRoutes = require('./gameRoute');

Router.use('/game', gameRoutes);

module.exports = Router;