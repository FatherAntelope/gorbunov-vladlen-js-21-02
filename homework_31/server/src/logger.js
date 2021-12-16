import logger from 'simple-node-logger';
import context from 'request-context';
import loggerOptions from "../config/loggerOptions.js";

const log = logger.createRollingFileLogger(loggerOptions);

const fileLog = {
  ...log,
  message: (message) => log.info(message),
  info: (message) => log.info(context.get('uuid'), ' ', message),
  error: (message) => log.error(context.get('uuid'), ' ', message),
  fatal: (message) => log.fatal(context.get('uuid'), ' ', message),
}

export default fileLog;
