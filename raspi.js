'use strict';

const io = require('socket.io-client');
const socket = io.connect(process.env.URI || 'http://localhost:5000');

socket.on('receivePosition', (position) => {
  console.log(position); // x,y;
});

socket.on('receiveMStatus', (status) => {
  console.log(status); // dragging, endDragging, click, dblclick, contextmenu
});
