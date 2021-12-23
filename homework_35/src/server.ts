import app from './app';
import { getServerConfigs } from './utils/configServer';
import format from 'string-format';
import logger from './logger';
import LOGGER_MESSAGES from './constants/loggerMessages';

const { host, port } = getServerConfigs();

app.listen(port, host, () => {
  console.log(format(LOGGER_MESSAGES.SERVER.ON, host, String(port)));
  logger.message(format(LOGGER_MESSAGES.SERVER.ON, host, String(port)));
});

process.on('SIGINT', () => {
  console.log(LOGGER_MESSAGES.SERVER.OFF);
  logger.message(LOGGER_MESSAGES.SERVER.OFF);
});
