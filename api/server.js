const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('./users/users-router.js');
const productsRouter = require('./products/products-router.js');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors())
server.use('/users', usersRouter);
server.use('/products', productsRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" })
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;