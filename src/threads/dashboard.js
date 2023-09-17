const { parentPort } = require('worker_threads');

parentPort.on('message', (message) => {
  if (message === 'startDashboard') {
    parentPort.postMessage('Dashboard started!');
  }
});
