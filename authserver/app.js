const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

// appling cors here
const cors = require('cors');
app.use(cors());
app.use(express.json())

// adding routes here
const Router = require('./route/routes');
app.use(Router);

// handling routes error here
const errorHandler = require('./util/errorHandler.middleware');
app.use(errorHandler)

//connecting to db here
const connectDB = require('./connectDB');
connectDB('ludoAuth');

//starting server here
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