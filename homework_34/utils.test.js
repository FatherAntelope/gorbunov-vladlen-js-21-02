import { isSecondContainsFirstStr } from './utils.js';

describe('Тестирую функцию isSecondContainsFirstStr', () => {
  test('Нормальные условия:', () => {
    let firstStr = 'Иван родил девчонку, велел тащить пелёнку';

    expect(isSecondContainsFirstStr(firstStr, 'родил')).toBe(true);
    expect(isSecondContainsFirstStr(firstStr, 'Родил ДевЧоНкУ')).toBe(true);
    expect(isSecondContainsFirstStr(firstStr, ',')).toBe(true);
    expect(isSecondContainsFirstStr(firstStr, ' ')).toBe(true);
    expect(isSecondContainsFirstStr(firstStr, 'лён')).toBe(true);
    expect(isSecondContainsFirstStr(firstStr, ' лён ')).toBe(false);
    expect(isSecondContainsFirstStr(firstStr, 'Иванов')).toBe(false);
    expect(isSecondContainsFirstStr(firstStr, '?')).toBe(false);

    expect(isSecondContainsFirstStr('!"№;%:?*()_+^', '^')).toBe(true);
    expect(isSecondContainsFirstStr('!"№;%:?*()_+^', '!?')).toBe(false);
  });

  test('Исключительные условия:', () => {
    expect(isSecondContainsFirstStr('!"№;%:?*()_+^')).toBe(false);
    expect(isSecondContainsFirstStr()).toBe(false);
    expect(isSecondContainsFirstStr(1, 2)).toBe(false);
    expect(isSecondContainsFirstStr('123.24', 2)).toBe(true);
    expect(isSecondContainsFirstStr(274, 2)).toBe(true);
    expect(isSecondContainsFirstStr(null, null)).toBe(false);
    expect(isSecondContainsFirstStr('lorem', '')).toBe(false);
  });
});

