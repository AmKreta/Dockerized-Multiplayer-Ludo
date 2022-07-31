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
            gameList[roomId] = new Game({ playersId: membersInRoom });
            const pawnsInfo = {};
            Object.keys(gameList[roomId].players).forEach(playerId => {
                const player = gameList[roomId].players[playerId];
                Object.assign(pawnsInfo, { [player.color]: player.getPawnsInfo() });
            });
            socket.emit('gameStarted', { pawnsInfo })
        });

        socket.on('dieRolled', (roomId) => {

        })
    })


}