require('dotenv').config();

const path = require('path')
const express = require('express')

const server = require('./api/server');

const PORT = process.env.PORT || 5000;

// server.use(express.static(path.join(dirname, 'client/dist')))

// server.get('*', (req, res) => {
//     // if you want to serve a SPA using Express you totally can!
//     res.sendFile(path.join(dirname, 'client/dist', 'index.html'))
// })

server.listen(PORT, () => console.log(`\n** server up on port ${PORT} **\n`));