const { pawnPath, protectedSteps } = require("./gameMapInfo");
const generateId = require("./generateId");
const getRandomNoBetween = require("./getRandomNoBetween");
const Pawn = require("./pawn");
class Player {
    constructor(color, isBot) {
        this.color = color;
        this.path = pawnPath[color];
        this.lockedPawns = new Map();
        this.isBot = isBot;
        for (let i = 0; i < 4; i++)
            this.lockedPawns.set(generateId(), new Pawn());
        this.freepawns = new Map();
        this.NoPawnFree = true;
    }

    freeAPawn(pawnId) {
        let id = pawnId || [...this.lockedPawns.keys()][0];
        this.freepawns.set(id, this.lockedPawns.get(id));
        this.lockedPawns.delete(id);
        this.freepawns.get(id).stepIndex = 0;
    }

    getPawnsInfo() {
        const pawnsInfo = {};
        this.freepawns.forEach((pawn, pawnId) => pawnsInfo[pawnId] = pawn.stepIndex);
        this.lockedPawns.forEach((pawn, pawnId) => pawnsInfo[pawnId] = pawn.stepIndex);
        return pawnsInfo;
    }

    shouldMoveAutomatically(diceResult) {
        // returns id of pawn to move , if it should move automatically
        // else returns null
        if (this.freepawns.size === 0 && diceResult === 6) return [...this.lockedPawns.keys()][0];
        if (this.freepawns.size === 1 && diceResult !== 6) return [...this.freepawns.keys()][0];
        if (this.isBot) {
            if (diceResult === 6) {
                const res = getRandomNoBetween(0, 1);
                return res && this.freepawns.size
                    ? [...this.freepawns.keys()][getRandomNoBetween(0, this.freepawns.size - 1)]
                    : [...this.lockedPawns.keys()][getRandomNoBetween(0, this.freepawns.size - 1)];
            }
            return [...this.freepawns.keys()][0];
        }
        return null;
    }

    moveForward(pawnId, steps) {
        const pathTravelledArray = [];
        if (!this.freepawns.get(pawnId)) {
            this.freeAPawn(pawnId);
            return [this.path[this.freepawns.get(pawnId).stepIndex]];
        }
        for (let i = 0; i < steps; i++)
            pathTravelledArray.push(this.path[++this.freepawns.get(pawnId).stepIndex]);
        return pathTravelledArray;
    }

    killPawn(pawnId) {
        this.freepawns.get(pawnId).stepIndex = -1;
        this.lockedPawns.set(pawnId, this.freepawns.get(pawnId));
        this.freepawns.delete(pawnId);
    }

    checkIfAnyPawnCanDie(stepIndex) {
        this.freepawns.forEach((pawn, pawnId) => {
            if (!protectedSteps.has(stepIndex) && pawn.stepIndex === stepIndex) {
                this.killPawn(pawnId);
                return pawnId;
            }
        });
    }
}

module.exports = Player;