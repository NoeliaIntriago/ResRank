const winston = require("winston");
const stackTrace = require("stack-trace");
const path = require("path");

// Configuración del logger de winston
const customFormat = winston.format.printf(
  ({ level, message, timestamp, meta }) => {
    const trace = stackTrace.get();
    const caller = trace[3]; // ajusta según capas (logger > wrapper > caller > controller)
    const fileName = path.basename(caller.getFileName());
    const lineNumber = caller.getLineNumber();
    const functionName = caller.getFunctionName() || "anonymous";

    return `${timestamp} [${level.toUpperCase()}] (${fileName}:${lineNumber} - ${functionName}) ${message}`;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
  ],
});

// Función para asegurar que los errores se registren como texto
function extractMessage(message) {
  if (message instanceof Error) return message.stack || message.message;
  if (typeof message === "object") return JSON.stringify(message, null, 2);
  return message;
}

// Función exportada
const log = (level, message) => {
  logger.log({ level, message: extractMessage(message) });
};

module.exports = {
  log,
  info: (msg) => log("info", msg),
  error: (msg) => log("error", msg),
  warn: (msg) => log("warn", msg),
  debug: (msg) => log("debug", msg),
};
