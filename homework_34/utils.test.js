import {
  isSecondContainsFirstStr, sliceEnd, dataTransformation, checkFullName, pascalToSnakeCase, getHTMLComments,
  getNumbers, checkIdDocument
} from './utils.js';

/**
 * До тестов функции не были переписаны с нуля, тестировались исходные скрипты
 * ! - обнаружена грубая ошибка, приводящая к провалу скрипта
 * + - обнаружена простая ошибка, требующая добавления доп. проверки
 */

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
    expect(isSecondContainsFirstStr(firstStr, '?')).toBe(false); // !

    expect(isSecondContainsFirstStr('!"№;%:?*()_+^', '^')).toBe(true); // !
    expect(isSecondContainsFirstStr('!"№;%:?*()_+^', '!?')).toBe(false); // !
  });

  test('Исключительные условия:', () => {
    expect(isSecondContainsFirstStr('!"№;%:?*()_+^')).toBe(false);
    expect(isSecondContainsFirstStr()).toBe(false); // +
    expect(isSecondContainsFirstStr(1, 2)).toBe(false); // +
    expect(isSecondContainsFirstStr('123.24', 2)).toBe(true);
    expect(isSecondContainsFirstStr(274, 2)).toBe(true);
    expect(isSecondContainsFirstStr(null, null)).toBe(false);
    expect(isSecondContainsFirstStr('lorem', '')).toBe(false);
  });
});

describe('Тестирую функцию sliceEnd', () => {
  const str = 'Строка';
  test('Нормальные условия:', () => {
    expect(sliceEnd(str, 3)).toStrictEqual('Стр...');
    expect(sliceEnd(str, 0)).toStrictEqual(str);
    expect(sliceEnd(str, 6)).toStrictEqual(''); // +
    expect(sliceEnd('Волк - не тигр', 4)).toStrictEqual('Волк - не...');
    expect(sliceEnd('@', 1)).toStrictEqual('');
    expect(sliceEnd('E!@#$%^&*()_', 2)).toStrictEqual('E!@#$%^&*(...');
  });

  test('Исключительные условия:', () => {
    expect(sliceEnd(str, -2)).toStrictEqual(str);
    expect(sliceEnd('', 1)).toStrictEqual(''); // +
    expect(sliceEnd('@', 1)).toStrictEqual('');
    expect(sliceEnd(-123212.235043, 3)).toStrictEqual('-123212.235...');
    expect(sliceEnd(str)).toStrictEqual(str);
    expect(sliceEnd()).toStrictEqual(''); // +
    expect(sliceEnd(str, 2.2)).toStrictEqual('Стро...');
    expect(sliceEnd(str, 2.9)).toStrictEqual('Стро...');
  });
});
