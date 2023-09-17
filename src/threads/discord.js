const { parentPort } = require('worker_threads');

parentPort.on('message', (message) => {
  if (message === 'startDiscordBot') {
    const DiscordClient = require('../discord/discord');
    const client = new DiscordClient();

    client.startBot()
    parentPort.postMessage('Discord bot started!');
  }
});