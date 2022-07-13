const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const http = require('http');
const server = http.Server(app);

app.get('/amk', (req, res) => {
    res.status(200).json({ message: 'amk loves neha' });
});

app.get('/neha', (req, res) => {
    res.status(200).json({ message: 'neha loves amk 3000' });
});

server.listen(8000, () => {
    console.log('server listening on port 8000');
});

server.on('unhandeledRejection', (err, promise) => {
    server.close(() => process.exit(1));
})