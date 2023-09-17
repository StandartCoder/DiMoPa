const { Worker, isMainThread, parentPort } = require('worker_threads');
const fs = require('fs').promises;
const path = require('path');
const db = require('./utils/dbConnection.js');
const log = require('./utils/logger.js');

const configFilePath = path.join(__dirname, '..', 'data', 'config.json');

async function startDashboard() {
  const dashboardThread = new Worker('./src/threads/dashboard.js');

  dashboardThread.on('message', (message) => {
    log.success(`Thread-DASHBOARD : ${message}`);
  });

  dashboardThread.postMessage('startDashboard');
}

async function startDiscord() {
  const discordBotThread = new Worker('./src/threads/discord.js');

  discordBotThread.on('message', (message) => {
    log.success(`Thread-DISCORD   : ${message}`);
  });

  discordBotThread.postMessage('startDiscordBot');
}

async function main() {
  log.logo();

  try {
    await fs.access(configFilePath, fs.constants.F_OK);
    await startDashboard();
    await startDiscord();
  } catch (err) {
    log.warn(`This program isn't set up yet! Please do it now!`);
    await startDashboard();
  }
}

if (isMainThread) {
  main().catch((error) => {
    log.error(`Error in main script: ${error}`);
  });
}