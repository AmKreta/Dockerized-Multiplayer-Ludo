class Pawn {

    constructor() {
        this.stepIndex = -1;
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
        this.stepIndex = -1;
    }
}

module.exports = Pawn;