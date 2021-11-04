'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

app.use(express.static('./public'));

io.on('connection', (socket) => {
  console.log('connected', socket.id);

  socket.on('pointer', (position) => {
    io.emit('receivePosition', position);
  });
  socket.on('mStatus', (mStatus) => {
    io.emit('receiveMStatus', mStatus);
  });
});

http.listen(PORT, console.log(`server listening. Port: ${PORT}`));
