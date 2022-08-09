const Game = require('../util/game');
const generateId = require('../util/generateId');
const ludoEngine = require('../util/ludoEngine');

const gamePlayList = {};

module.exports = (io) => {
    io.on('connection', socket => {
        socket.emit('connected', { data: { socketId: socket.id } });

        socket.on('joinRoom', roomId => {
            socket.join(roomId);
        });

        socket.on('createRoom', () => {
            const newRoomId = generateId();
            socket.join(newRoomId);
            socket.emit('roomCreated', newRoomId);
        })

        socket.on('startGame', roomId => {
            const membersInRoom = [...(io.sockets.adapter.rooms.get(roomId))];
            gamePlayList[roomId]=new ludoEngine(membersInRoom,roomId,{ io, socket });
        });

        socket.on('rollADice', (roomId) => {
            const gamePlay = gamePlayList[roomId];
            gamePlay.rollADice();
        });

        socket.on('pawnMoveComplete', () => {

        })

        socket.on('selectedPawnToMove', ({ roomId, pawnId }) => {
            const gamePlay = gamePlayList[roomId];
            gamePlay. moveSelectedPawn(pawnId);
        });
    })
}