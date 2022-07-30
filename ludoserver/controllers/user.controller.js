const user = require('../models/user.model');

module.exports.createUser = async (req, res, next) => {
    const { username, password } = req.body;
    const result = await user.create({ username, password });

}

module.exports.login = async (req, res, next) => {

}

module.exports.updateUser = async (req, res, next) => {

}

module.exports.deleteUser = async (req, res, next) => {

}