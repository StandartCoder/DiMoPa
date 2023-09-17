const { Worker, isMainThread, parentPort } = require('worker_threads');
const db = require('./utils/dbConnection.js');
const log = require('./utils/logger.js');

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

async function isFirstStart() {
  const firstStart = await db.get('first_start');
  return !firstStart;
}

async function setupDatabase() {
  await db.set('first_start', false)
  await db.set('config', {token: "", invite_url: "", ownerid: ""})
  await db.set('server_data', [])
  await db.set('user_data', [])
}

async function main() {
  log.logo();

  try {
    const isStart = await isFirstStart();
    if (isStart) {
      log.info('This is the first start of this application! Setting up database...');
      await setupDatabase();
    }

    const config = await db.get('config');
    if (!config || config.token == "") {
      log.warn('This application isn\'t set up yet! Please do it now!');
      return startDashboard();
    }

    await startDashboard();
    await startDiscord();
  } catch (err) {
    log.error(`Error in main script: ${err}`);
  }
}

if (isMainThread) {
  main().catch((error) => {
    log.error(`Error in main script: ${error}`);
  });
}