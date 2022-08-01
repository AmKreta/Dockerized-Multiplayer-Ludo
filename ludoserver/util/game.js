const generateId = require("./generateId");
const getRandomNoBetween = require("./getRandomNoBetween");
const Player = require("./player");

class Game {
    constructor({ playersId = [], ctx }) {
        this.players = {
            [playersId[0]]: new Player('red'),
            [playersId[1] || generateId()]: new Player('green', !!playersId[1]),
            [playersId[2] || generateId()]: new Player('yellow', !!playersId[2]),
            [playersId[3] || generateId()]: new Player('blue', !!playersId[3]),
        };
        this.activePlayerIndex = 0;
        this.diceResult = 0;
    }

    getRandomNo(start = 1, end = 6) {
        return Math.floor(Math.random() * (end - start + 1) + start);
    }

    setNextActivePlayer() {
        this.activePlayerIndex = this.activePlayerIndex === 3
            ? 0
            : this.activePlayerIndex + 1;
    }

    get currentPlayer() {
        return this.players[this.activePlayerIndex];
    }

    rollADice() {
        const diceResult = getRandomNoBetween(1, 6);
        this.diceResult = diceResult;
        return diceResult;
    }

    isCurrentPlayerBot() {
        return this.currentPlayer.isBot;
    }

    shouldCurrentPlayerMoveAutomatically() {
        return this.currentPlayer.shouldMoveAutomatically(this.diceResult);
    }

    collisionDetection(stepIndex) {
        for (let i = 0; i < 4; i++) {
            if (i != this.activePlayerIndex) {
                const pawnId = this.players[i].checkIfAnyPawnCanDie(stepIndex);
                return { playerIndex: i, pawnId };
            }
        }
    }

    moveForward(pawnId) {
        // contains all the indexes that the pawn will hop on
        const pathTravelledArray = this.currentPlayer.moveForward(pawnId, this.diceResult);
        const lastElement = pathTravelledArray.at(-1);
        let killedpawnId;
        if (lastElement != 100)
            killedPawnDetails = this.collisionDetection(pathTravelledArray.at(-1));
        if (!(killedpawnId || this.diceResult === 6))
            this.setNextActivePlayer();
        return { pathTravelledArray, killedpawnId };
    }

    endGame() {

    }
}

module.exports = Game;