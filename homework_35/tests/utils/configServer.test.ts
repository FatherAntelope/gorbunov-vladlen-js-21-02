import {
  getServerConfigs, getApiKeysConfigs, getLoggerConfigs, checkExistLogsDirectory
} from "../../src/utils/configServer";
import any = jasmine.any;

describe('Testing getServerConfigs function:', () => {
  const httpHeaders = [
    {option: "Access-Control-Allow-Origin", value: "http://localhost:3000"},
    {option: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, PATCH, OPTIONS"},
    {option: "Access-Control-Allow-Headers", value: "Origin, X-Requested-With, Content-Type, Accept"}
  ];
  test('Normal:', () => {
    expect(getServerConfigs().port).toBe(5000);
    expect(getServerConfigs().host).toBe('localhost');
    expect(getServerConfigs().httpHeaders).toEqual(httpHeaders);
  });
});

describe('Testing getApiKeysConfigs function:', () => {
  test('Normal:', () => {
    expect(getApiKeysConfigs().dummyapi).toBe('617d424dbe5f9771bd07c1b0');
    expect(getApiKeysConfigs().imgbb).toBe('563b9001db5870468591911bba787b38');
  });
});

describe('Testing getLoggerConfigs function:', () => {
  test('Normal:', () => {
    expect(getLoggerConfigs().logDirectory).toBe('./logs');
    expect(getLoggerConfigs().dateFormat).toBe('DD.MM.YYYY');
    expect(getLoggerConfigs().fileNamePattern).toBe('<DATE>.log');
  });
});

describe('Testing checkExistLogsDirectory function:', () => {
  test('Normal:', () => {
    expect(checkExistLogsDirectory());
  });
});
