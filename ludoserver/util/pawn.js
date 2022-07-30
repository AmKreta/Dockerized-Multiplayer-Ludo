const { pawnPath } = require("./gameMapInfo");

class Pawn {
    constructor(color) {
        this.color = color;
        this.path = pawnPath[this.color];
        this.stepIndex = 0;
        this.isFree = false;
    }

    moveForward(steps, onMoveForward, onFinishMoving) {
        try {
            if (steps < 0 || steps > 6)
                throw 'invalid no of steps';
            for (let i = 1; i <= steps; i++) {
                const timeout = setTimeout(function () {
                    this.stepIndex++;
                    onMoveForward && onMoveForward(this);
                    i == steps && clearTimeout(timeout);
                }, 500)
            }
            onFinishMoving && onFinishMoving(this);
        } catch (err) {
            console.log(err);
        }
    }

    detectCollision(pawnsPosition) {
        try {
            if (!pawnsPosition)
                throw 'pawnsPositionNotFound';
            for (let playerId of pawnsPosition) {

            }
        } catch (err) {
            console.lof(err);
        }
    }

    kill() {
        this.isFree = false;
        this.stepIndex = 0;
    }
}

module.exports = Pawn;