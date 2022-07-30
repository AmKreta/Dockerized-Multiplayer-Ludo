const generateId = require("./generateId");
const Pawn = require("./pawn");

class Player {
    constructor(color) {
        this.color = color;
        this.pawns = {};
        for (let i = 0; i < 4; i++)
            this.pawns[generateId] = new Pawn(color);
    }

    moveForward(pawnId, steps) {
        try {
            if (!this.pawns[pawnId])
                throw 'pawnId not found';
            this.pawns[pawnId].moveForward(steps);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Player;