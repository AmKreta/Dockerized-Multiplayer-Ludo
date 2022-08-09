const Game = require("./game");

class ludoEngine {
    constructor(members, roomId, ctx) {
        this.game = new Game({ playersId: members });
        this.socket = ctx.socket;
        this.io = ctx.io;
        this.roomId = roomId;
        this.onInit();
    }

    broadcastInRoom(eventName, data, cb) {
        this.socket.to(this.roomId).emit(eventName, data);
    }

    emitInRoom(eventName, data, cb) {
        this.io.to(this.roomId).emit(eventName, data);
    }

    onInit() {
        const pawnsInfo = {};
        Object.keys(this.game.players).forEach(playerId => {
            const player = this.game.players[playerId];
            Object.assign(pawnsInfo, { [player.color]: player.getPawnsInfo() });
        });
        this.emitInRoom('gameStarted', { pawnsInfo, activeColor: this.game.activeColor });
    }

    rollADice() {
        const game = this.game;
        this.emitInRoom('rollADice');
        const result = game.rollADice();
        this.emitInRoom('rollADiceResult', result);
        const pawnId = game.shouldCurrentPlayerMoveAutomatically();
        if (pawnId) {
            // if current player should move automatically , ie <=1 pawn free
            this.moveAPawn(pawnId);
        }
        else if (!game.canCurrentPlayerMove()) {
            // if current player cant move at all
            this.emitInRoom('setActiveColor', game.activeColor);
        }
        else {
            // player has rolled the dice and has more than one moveable pawns
            this.emitInRoom('setMoveablePawns', game.moveablePawns);
        }
    }

    moveAPawn(pawnId) {
        const { pathTravelledArray, killedPawnId, killedPawnColor, movedPawnColor } = this.game.moveForward(pawnId);
        this.emitInRoom('movePawn', { pathTravelledArray, killedPawnId, killedPawnColor, movedPawnColor, pawnId });
        if(this.game.isCurrentPlayerBot){
            const timeout=setTimeout(()=>{
                this.onPawnMoveComplete();
                clearTimeout(timeout);
            },pathTravelledArray.length*750);
        }
    }

    moveSelectedPawn(pawnId){
        if (this.game.isSelectedPawnToMoveValid(pawnId)) 
            this.moveAPawn(pawnId);
    }

    onPawnMoveComplete() {
        this.game.setNextActivePlayer();
        this.emitInRoom('setActiveColor', this.game.activeColor);
        if(this.game.isCurrentPlayerBot)
            this.rollADice();
    }
}

module.exports = ludoEngine;