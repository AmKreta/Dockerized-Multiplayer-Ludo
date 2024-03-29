const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

const http = require('http');
const server = http.Server(app);

const connectDB = require('./connectDB');
connectDB('ludo');

const Routes = require('./routes/index');
app.use('/api', Routes);

//init socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
const socketHandler = require('./sockerHandler/socketHandler');
socketHandler(io);

server.listen(8000, () => {
    console.log('server listening on port 8000');
});

server.on('unhandeledRejection', (err, promise) => {
    server.close(() => process.exit(1));
})