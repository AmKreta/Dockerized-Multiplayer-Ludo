const { getGameInfo } = require('../controllers/game.controller');

const Router = require('express').Router();

Router.route('/getGameMapInfo').get(getGameInfo);

module.exports = Router;