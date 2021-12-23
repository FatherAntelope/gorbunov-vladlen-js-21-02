import { getConvertDateOfPublish, getConvertUserFullName, getDate } from "../../src/utils/common";

describe('Testing getConvertDateOfPublish function:', () => {
  test('Normal:', () => {
    expect(getConvertDateOfPublish('1956-04-15T00:10:35.555Z')).toBe('15 апр. 1956 г. в 3:10');
    expect(getConvertDateOfPublish('2021-03-28T00:09:35.555Z')).toBe('28 марта в 3:09');
  });
});

describe('Testing getConvertUserFullName function:', () => {
  test('Normal:', () => {
    expect(getConvertUserFullName('Иван', 'Иванов')).toBe('Иван Иванов');
  });
});

describe('Testing getDate function:', () => {
  test('Normal:', () => {
    expect(getDate('2021-12-05T00:10:35.555Z')).toBe('5 декабря 2021');
  });
});
