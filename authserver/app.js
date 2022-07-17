const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

server.listen('8080', () => {
    console.log('Auth server up and running on port 8080');
});

server.on('unhandeledRejection', (err, promise) => {
    server.close(() => {
        console.log('server crashed due to ', err);
        console.log('closing Authserver.....');
        process.exit(1);
    });
});