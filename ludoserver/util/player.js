const { pawnPath } = require("./gameMapInfo");
const generateId = require("./generateId");
const Pawn = require("./pawn");

class Player {
    constructor(color, isBot) {
        this.color = color;
        this.path = pawnPath[color];
        this.lockedPawns = {};
        this.isBot = isBot;
        for (let i = 0; i < 4; i++)
            this.lockedPawns[generateId()] = new Pawn(color);
        this.freepawns = {};
        this.NoPawnFree = true;
    }

    freeAPawn(pawnId) {
        let id = pawnId || Object.keys(this.lockedPawns)[0];
        this.freepawns[id] = this.lockedPawns[id];
        delete this.lockedPawns[id]
        this.freepawns[id].stepIndex = 0;
    }

    getPawnsInfo() {
        const pawnsInfo = {};
        Object.keys(this.freepawns).forEach(pawnId => {
            pawnsInfo[pawnId] = this.freepawns[pawnId].stepIndex;
        });
        Object.keys(this.lockedPawns).forEach(pawnId => {
            pawnsInfo[pawnId] = this.lockedPawns[pawnId].stepIndex;
        });
        return pawnsInfo;
    }

    moveForward(pawnId, steps) {
        try {
            if (!this.freepawns[pawnId])
                throw 'pawnId not found';
            this.freepawns[pawnId].moveForward(steps);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Player;