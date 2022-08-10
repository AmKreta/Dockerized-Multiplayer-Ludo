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

    autoDiceRoll(){
        const timeout=setTimeout(()=>{
            this.rollADice();
            clearTimeout(timeout);
        },1000);
    }

    onPlayerAllTurnsCompleted(){
        // call this function if current player has exhausted all his chances
        this.game.setNextActivePlayer();
        this.emitInRoom('setActiveColor', this.game.activeColor);
        if(this.game.shouldCurrentPlayerRollADiceAudomatically())
            this.autoDiceRoll();
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
            // or current player is bot
            this.emitInRoom('setMoveablePawns', game.moveablePawns);
            this.moveSelectedPawn(pawnId);
        }
        else {
            // player has rolled the dice and has more than one moveable pawns
            this.emitInRoom('setMoveablePawns', game.moveablePawns);
        }
    }

    moveAPawn(pawnId) {
        const { pathTravelledArray, killedPawnId, killedPawnColor, movedPawnColor } = this.game.moveForward(pawnId);
        this.emitInRoom('movePawn', { pathTravelledArray, killedPawnId, killedPawnColor, movedPawnColor, pawnId });
        // todo:- call this automatically only for bots
        const timeout=setTimeout(()=>{
            this.onPawnMoveComplete();
            clearTimeout(timeout);
        },pathTravelledArray.length*750);
    }

    moveSelectedPawn(pawnId){
        if (this.game.isSelectedPawnToMoveValid(pawnId)) 
            this.moveAPawn(pawnId);
    }

    onPawnMoveComplete() {
        // if player killed other pawn or last dice result is 6,
        // dont update active player
        if(this.game.diceResult!==6){
           this.onPlayerAllTurnsCompleted();
        }
        else if(this.game.shouldCurrentPlayerRollADiceAudomatically())
            this.autoDiceRoll();
    }
}

module.exports = ludoEngine;