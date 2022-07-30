const Player = require("./player");

class Game {
    constructor({ roomId, playersId }) {
        this.roomId = roomId;
        this.players = {
            [playersId[0]]: new Player('red'),
            [playersId[1]]: new Player('green'),
            [playersId[2]]: new Player('yellow'),
            [playersId[3]]: new Player('blue'),
        };
        this.activePlayerIndex = 0;
    }

    updateNextActivePlayer() {
        this.activePlayerIndex = this.activePlayerIndex === 3
            ? 0
            : this.activePlayerIndex + 1;
    }

    rollADice() {

    }
}

module.exports = Game;