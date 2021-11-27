'use strict';

const fs = require('fs');
const express = require('express');
const formData = require('express-form-data');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

app.use(express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse());

io.on('connection', (socket) => {
  console.log('connected', socket.id);

  socket.on('pointer', (position) => {
    io.emit('receivePosition', position);
  });
  socket.on('mStatus', (mStatus) => {
    io.emit('receiveMStatus', mStatus);
  });
});

app.post('/frame', (req, res) => {
  if (!req.files.frame) {
    res.status(400).send('plz set secret and frame');
    return;
  }

  io.emit('render', `data:image/png;base64,${fs.readFileSync(req.files.frame.path, { encoding: 'base64' })}`);
  res.send('received');
});

http.listen(PORT, console.log(`server listening. Port: ${PORT}`));
