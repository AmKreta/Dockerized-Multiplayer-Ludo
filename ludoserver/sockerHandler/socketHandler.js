const Game = require('../util/game');
const generateId = require('../util/generateId');

const gameList = {};

module.exports = (io) => {
    io.on('connection', socket => {
        socket.emit('connected', { data: { socketId: socket.id } });

        socket.on('joinRoom', roomId => {
            socket.join(roomId);
        });

        socket.on('createRoom', () => {
            console.log('createRoom')
            const newRoomId = generateId();
            socket.join(newRoomId);
            socket.emit('roomCreated', newRoomId);
        })

        socket.on('startGame', roomId => {
            const membersInRoom = [...(io.sockets.adapter.rooms.get(roomId))];
            const game = new Game({ playersId: membersInRoom, ctx: { io, socket, roomId } });
            gameList[roomId] = game;
            const pawnsInfo = {};
            Object.keys(game.players).forEach(playerId => {
                const player = game.players[playerId];
                Object.assign(pawnsInfo, { [player.color]: player.getPawnsInfo() });
            });
            io.to(roomId).emit('gameStarted', { pawnsInfo, activeColor: game.activeColor });
        });

        socket.on('rollADice', (roomId) => {
            const game = gameList[roomId];
            socket.to(roomId).emit('rollADice');
            const result = game.rollADice();
            io.to(roomId).emit('rollADiceResult', result);
            const pawnId = game.shouldCurrentPlayerMoveAutomatically();
            if (pawnId) {
                // if current player can move automatically , ie <=1 pawn free
                const { pathTravelledArray, killedPawnId, killedPawnColor, movedPawnColor } = game.moveForward(pawnId);
                socket.emit('movePawn', { pathTravelledArray, killedPawnId, killedPawnColor, movedPawnColor, pawnId });
                game.setNextActivePlayer();
                socket.emit('setActiveColor', game.activeColor);
            }
            else if (!game.canCurrentPlayerMove()) {
                // if current player cant move at all
                game.setNextActivePlayer();
                socket.emit('setActiveColor', game.activeColor);
            }
            else {
                // player has rolled the dice and has more than one moveable pawns
                socket.emit('setMoveablePawns', game.moveablePawns);
            }
        });

        socket.on('pawnMoveComplete', () => {

        })

        socket.on('pawnSelectedToMoved', (pawnId) => {
            const { pathTravelledArray, killedPawnId, killedPawnColor, movedPawnColor } = gameList[roomId].moveForward(pawnId);
            socket.to(roomId).emit('movePawn', { pathTravelledArray, killedPawnId, killedPawnColor, movedPawnColor });
        });
    })
}