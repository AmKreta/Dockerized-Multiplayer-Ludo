const generateId = require("./generateId");
const getRandomNoBetween = require("./getRandomNoBetween");
const Player = require("./player");

const d = [6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1];
let x = 0;
class Game {
    constructor({ playersId = []}) {
        this.players = {
            [playersId[0]]: new Player('red',!playersId[0]),
            [playersId[1] || generateId()]: new Player('green', !playersId[1]),
            [playersId[2] || generateId()]: new Player('yellow', !playersId[2]),
            [playersId[3] || generateId()]: new Player('blue', !playersId[3]),
        };
        this.playerIds = Object.keys(this.players);
        this.activePlayerId = playersId[0];
        this.diceResult = 0;
        this.killedByCurrentPlayer = null;
    }

    get activeColor() {
        return this.players[this.activePlayerId].color;
    }

    setNextActivePlayer() {
        if (!(this.killedByCurrentPlayer || this.diceResult === 6)) {
            // only update if no player got killed when player moved,
            // and he didn't got 6
            let res = this.playerIds.findIndex(id => id === this.activePlayerId);
            this.activePlayerId = res === 3 ? this.playerIds[0] : this.playerIds[res + 1];
        }
    }

    get currentPlayer() {
        return this.players[this.activePlayerId];
    }

    rollADice() {
        const diceResult = x < d.length ? d[x++] : getRandomNoBetween(1, 6);
        this.diceResult = diceResult;
        return diceResult;
    }

    isCurrentPlayerBot() {
        return this.currentPlayer.isBot;
    }

    shouldCurrentPlayerMoveAutomatically() {
        const pawnId = this.currentPlayer.shouldMoveAutomatically(this.diceResult);
        if (pawnId) return pawnId;
    }

    canCurrentPlayerMove() {
        const res = this.currentPlayer.freepawns.size > 0 || this.diceResult === 6;
        return res;
    }

    shouldCurrentPlayerRollADiceAudomatically() {
        return this.currentPlayer.isBot;
    }

    collisionDetection(stepIndex) {
        for (let i = 0; i < 4; i++) {
            const id = this.playerIds[i];
            if (id != this.activePlayerId) {
                const { pawnId, color } = this.players[id].checkIfAnyPawnCanDie(stepIndex) || {};
                if (pawnId)
                    return { killedPawnId: pawnId, killedPawnColor: color };
            }
        }
    }

    moveForward(pawnId) {
        // contains all the indexes that the pawn will hop on
        const pathTravelledArray = this.currentPlayer.moveForward(pawnId, this.diceResult);
        const movedPawnColor = this.currentPlayer.color;
        const lastElement = pathTravelledArray.at(-1);
        if (lastElement != 100) {
            let { killedPawnId, killedPawnColor } = this.collisionDetection(pathTravelledArray.at(-1)) || {};
            if (killedPawnId)
                this.killedByCurrentPlayer = killedPawnId;
            return { pathTravelledArray, killedPawnId, killedPawnColor, movedPawnColor };
        }
    }


    get moveablePawns() {
        if (this.diceResult === 6)
            return [...this.currentPlayer.lockedPawns.keys(), ...this.currentPlayer.freepawns.keys()];
        return [...this.currentPlayer.freepawns.keys()];
    }


    isSelectedPawnToMoveValid(pawnId) {
        return this.currentPlayer.freepawns.has(pawnId) || this.currentPlayer.lockedPawns.has(pawnId);
    }

    endGame() {

    }
}

module.exports = Game;