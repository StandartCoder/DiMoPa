const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const clearConsole = require('clear-console');

const logDirectory = 'logs';
const today = new Date();
const logFile = path.join(logDirectory, `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.log`);

const getTimeStamp = () => {
  const now = new Date();
  return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
};

const log = {
  success: (message) => {
    const formattedMessage = `${getTimeStamp()} [ SUCCESS ] » ${message}`;
    console.log(chalk.green(formattedMessage));
    appendToFile(formattedMessage);
  },
  error: (message) => {
    const formattedMessage = `${getTimeStamp()} [ ERROR   ] » ${message}`;
    console.log(chalk.red(formattedMessage));
    appendToFile(formattedMessage);
  },
  warn: (message) => {
    const formattedMessage = `${getTimeStamp()} [ WARNING ] » ${message}`;
    console.log(chalk.yellow(formattedMessage));
    appendToFile(formattedMessage);
  },
  info: (message) => {
    const formattedMessage = `${getTimeStamp()} [ INFO    ] » ${message}`;
    console.log(chalk.blue(formattedMessage));
    appendToFile(formattedMessage);
  },
  debug: (message) => {
    const formattedMessage = `${getTimeStamp()} [ DEBUG   ] » ${message}`;
    console.log(chalk.gray(formattedMessage));
    appendToFile(formattedMessage);
  },
  custom: (message) => {
    const formattedMessage = `${getTimeStamp()} [ CUSTOM  ] » ${message}`;
    console.log(chalk.magenta(formattedMessage));
    appendToFile(formattedMessage);
  },
  newline: () => {
    console.log("\n");
    appendToFile(formattedMessage);
  },
  logo: () => {
    clearConsole();
    const gradientColors = [
        chalk.hex('#459FE6'),  // Light Blue
        chalk.hex('#6947A6'),  // Purple
    ];

    const logoText = `
██████  ██ ███    ███  ██████  ██████   █████  
██   ██ ██ ████  ████ ██    ██ ██   ██ ██   ██ 
██   ██ ██ ██ ████ ██ ██    ██ ██████  ███████ 
██   ██ ██ ██  ██  ██ ██    ██ ██      ██   ██ 
██████  ██ ██      ██  ██████  ██      ██   ██ 
`;

    const coloredLogo = logoText
    .split('\n')
    .map((line) => {
        let coloredLine = '';
        for (let i = 0; i < line.length; i++) {
            const color = gradientColors[i % gradientColors.length];
            coloredLine += color(line[i]);
        }
        return coloredLine;
    })
    .join('\n');

    console.log(chalk.bold(coloredLogo));
  },
};

function ensureLogDirectoryExists() {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }
}

function appendToFile(message) {
  ensureLogDirectoryExists();

  fs.appendFile(logFile, `${message}\n`, (err) => {
    if (err) {
      console.error(`Error writing to log file: ${err}`);
    }
  });
}

module.exports = log;