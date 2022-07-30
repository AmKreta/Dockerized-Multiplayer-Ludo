const { starredSteps, colouredSteps } = require('../util/gameMapInfo');

module.exports.createGame = (req, res, next) => {

}

module.exports.getGameInfo = (req, res, next) => {
    res.status(200).json({
        starredSteps: starredSteps,
        colouredSteps: {
            red: [...colouredSteps.red],
            blue: [...colouredSteps.blue],
            yellow: [...colouredSteps.yellow],
            green: [...colouredSteps.green]
        }
    });
}