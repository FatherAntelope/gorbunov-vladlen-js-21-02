import fs from 'fs';

interface IHttpHeader {
  option: string;
  value: string;
}

interface IServerConfigs {
  host: string;
  port: number;
  httpHeaders: IHttpHeader[];
}

interface ILoggerConfigs {
  logDirectory: string;
  fileNamePattern: string;
  dateFormat: string;
}

interface IApiKeysConfig {
  dummyapi: string;
  imgbb: string;
}

const path: string = './config.json';

const checkExistLogsDirectory = (): void => {
  const logsDirectory: string = getLoggerConfigs().logDirectory;
  !fs.existsSync(logsDirectory) && fs.mkdirSync(logsDirectory);
};

const getServerConfigs = (): IServerConfigs => {
  return JSON.parse(fs.readFileSync(path, 'utf8')).server;
};

const getLoggerConfigs = (): ILoggerConfigs => {
  return JSON.parse(fs.readFileSync(path, 'utf8')).logger;
};

const getApiKeysConfigs = (): IApiKeysConfig => {
  return JSON.parse(fs.readFileSync(path, 'utf8')).apiKeys;
};

export { getServerConfigs, getLoggerConfigs, getApiKeysConfigs, checkExistLogsDirectory, IHttpHeader };
