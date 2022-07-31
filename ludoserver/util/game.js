const generateId = require("./generateId");
const Player = require("./player");

class Game {
    constructor({ playersId = [], socketInstance }) {
        this.players = {
            [playersId[0]]: new Player('red'),
            [playersId[1] || generateId()]: new Player('green', !!playersId[1]),
            [playersId[2] || generateId()]: new Player('yellow', !!playersId[2]),
            [playersId[3] || generateId()]: new Player('blue', !!playersId[3]),
        };
        this.activePlayerIndex = 0;
    }

    getRandomNo(start = 1, end = 6) {
        return Math.floor(Math.random() * (end - start + 1) + start);
    }

    setNextActivePlayer() {
        this.activePlayerIndex = this.activePlayerIndex === 3
            ? 0
            : this.activePlayerIndex + 1;
    }

    rollADie() {
        const dieResult = this.getRandomNo();
        const currentPlayer = this.players[this.activePlayerIndex];
        if (currentPlayer.isBot) {
            const freePawnIds = Object.keys(currentPlayer.freepawns);
            if (freePawnIds.length) {
                const tappedPawnIndex = this.getRandomNo(0, freePawnIds.length - 1);
                const tappedPawnId = freePawnIds[tappedPawnIndex];
                currentPlayer.moveForward(tappedPawnId, dieResult);
            }
            else if (dieResult === 6) {
                currentPlayer.freeAPawn();
            }
        }
        this.setNextActivePlayer();
    }

    endGame() {

    }
}

module.exports = Game;