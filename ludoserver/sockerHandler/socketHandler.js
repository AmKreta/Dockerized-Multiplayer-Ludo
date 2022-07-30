module.exports.connectedUsers = new Map();

module.exports = (io) => {
    io.on('connection', socket => {
        socket.emit('connected', { data: { socketId: socket.id } });
    })
}