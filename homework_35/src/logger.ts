import SimpleLogger from 'simple-node-logger';
import { checkExistLogsDirectory, getLoggerConfigs } from './utils/configServer';
const context = require('request-context');

checkExistLogsDirectory();

const loggerOptions = getLoggerConfigs();
const log = SimpleLogger.createRollingFileLogger(loggerOptions);

const logger = {
  ...log,
  message: (message: string) => log.info(message),
  info: (message: string) => log.info(context.get('uuid'), ' ', message),
  error: (message: string) => log.error(context.get('uuid'), ' ', message),
  fatal: (message: string) => log.fatal(context.get('uuid'), ' ', message),
};

export default logger;
