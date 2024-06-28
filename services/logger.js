const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;
const path = require("path");
const fs = require("fs");

function createDirForLogFiles(directoryPath) {
      // Check if the directory exists
      if (!fs.existsSync(directoryPath)) {
            // Create the directory
            fs.mkdirSync(directoryPath, { recursive: true });
            console.log(`logFiles directory created: ${directoryPath}`);
      } else {
            console.log(`logFiles directory already exists: ${directoryPath}`);
      }
}
const rootFolder = path.join(__dirname, "../");
const folderNameToHoldLogs = "logFiles";
const fullPathToFolder = path.join(rootFolder, folderNameToHoldLogs);

createDirForLogFiles(fullPathToFolder);

// Custom filter to log only 'debug' level messages
const debugOnlyFilter = format((info, opts) => {
      return info.level === "debug" ? info : false;
})();

//this format is for showing the actual messages
const myFormat = printf(({ level, message, timestamp, stack }) => {
      //using ternary: (condition ? expressionIfTrue : expressionIfFalse;)
      const stackPart = stack ? `ORIGINAL stacktrace ${stack}` : "";

      return `\n${level}:\n${timestamp},\n${message}\n ${stackPart} `;
});

const logger = createLogger({
      //level: "debug",
      transports: [
            new transports.File({
                  level: "error",
                  filename: `${fullPathToFolder}/error.log`,
            }),

            new transports.File({
                  level: "debug",
                  filename: `${fullPathToFolder}/debug.log`,
                  format: combine(debugOnlyFilter),
            }),

            new transports.File({
                  level: "debug",
                  filename: `${fullPathToFolder}/combined.log`,
            }),
      ],

      //this gets applied to all transports, otherwise you can add 1 by 1
      //inside of each by using only format.combine
      format: format.combine(format.timestamp({ format: "MM-DD-YYYY hh:mm:ss A" }), myFormat),
});

module.exports = logger;
