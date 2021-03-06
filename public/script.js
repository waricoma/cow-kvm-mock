'use strict';

const socket = io();
const pp = document.getElementsByTagName('p')[0];
const ps = document.getElementsByTagName('p')[1];
const img = document.getElementsByTagName('img')[0];
const ctrl = document.getElementById("ctrl");

socket.on('render', (frame) => {
  img.src = frame;
});

let mStatus = 'unknown';

const updateStatus = (status) => {
  ps.innerText = `status: ${status}`;
  socket.emit('mStatus', status);
};

document.getElementsByTagName('button')[0].onclick = () => {
  updateStatus('reboot');
};

document.addEventListener('keydown', (event) => {
  if (!event.ctrlKey) {
    return;
  }

  ctrl.style.display = 'block';

  window.onmousemove = (event) => {
    if (mStatus === 'mousedown' || mStatus === 'dragging') {
      mStatus = 'dragging';
      updateStatus(mStatus);
    }
    pp.innerText = `x: ${event.clientX}, y: ${event.clientY}`;
    socket.emit('pointer', `${event.clientX},${event.clientY}`);
  };

  window.onmouseup = () => {
    if (mStatus !== 'dragging') {
      return;
    }
    mStatus = 'endDragging';
    updateStatus(mStatus);
  };

  window.onmousedown = () => {
    mStatus = 'mousedown';
  };

  window.onclick = () => {
    if (mStatus === 'dragging' || mStatus === 'endDragging') {
      return;
    }
    mStatus = 'click';
    updateStatus(mStatus);
  };

  window.ondblclick = () => {
    mStatus = 'dblclick';
    updateStatus(mStatus);
  };

  window.oncontextmenu = () => {
    mStatus = 'contextmenu';
    updateStatus(mStatus);
  };
});
