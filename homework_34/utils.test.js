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
    expect(isSecondContainsFirstStr({}, {})).toBe(false); // !
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
    expect(sliceEnd({}, {})).toStrictEqual(''); // !
  });
});

describe('Тестирую функцию pascalToSnakeCase', () => {
  test('Нормальные условия:', () => {
    expect(pascalToSnakeCase('PascalCase')).toStrictEqual('pascal_case');
    expect(pascalToSnakeCase('ButtonForSend')).toStrictEqual('button_for_send');
    expect(pascalToSnakeCase('JS')).toStrictEqual('j_s');
    expect(pascalToSnakeCase('J')).toStrictEqual('j');
    expect(pascalToSnakeCase('!£$F')).toStrictEqual('!£$_f');
    expect(pascalToSnakeCase('PascalCase1@Snake')).toStrictEqual('pascal_case1@_snake');
    expect(pascalToSnakeCase(' PascalCase ')).toStrictEqual('pascal_case'); // +
    expect(pascalToSnakeCase(' PascalCase AndArr@ he')).toStrictEqual('pascal_case and_arr@ he'); // +
  });

  test('Исключительные условия:', () => {
    expect(pascalToSnakeCase('')).toStrictEqual('');
    expect(pascalToSnakeCase()).toStrictEqual(''); // !
    expect(pascalToSnakeCase(123)).toStrictEqual('123');
    expect(pascalToSnakeCase(null)).toStrictEqual('');
    expect(pascalToSnakeCase({})).toStrictEqual(''); // !
  });
});

describe('Тестирую функцию checkFullName', () => {
  test('Нормальные условия:', () => {
    expect(checkFullName('Горбунов Владлен')).toBe(true);
    expect(checkFullName('Владлен')).toBe(false);
    expect(checkFullName('Владлен Вячеславович')).toBe(true);
    expect(checkFullName('Горбунов Владлен Вячеславович')).toBe(true);
    expect(checkFullName('Горбунов Владлен Вячеславо')).toBe(false);
    expect(checkFullName('горбунов владлен вячеславович')).toBe(true);
  });

  test('Исключительные условия:', () => {
    expect(checkFullName('')).toBe(false);
    expect(checkFullName(123)).toBe(false);
    expect(checkFullName()).toBe(false);
    expect(checkFullName()).toBe(false);
    expect(checkFullName('Горбунов Владлен ВячеславоВИЧ')).toBe(true); // +
    expect(checkFullName('Горбунов Владлен Имя Вячеславович')).toBe(false);
    expect(checkFullName('  Горбунов         Владлен   ВячеславоВИЧ ')).toBe(true); // +
    expect(checkFullName(' Гор бу нов Вла дл ен ВячеславоВИЧ ')).toBe(false);
    expect(checkFullName('Name Name Namвич')).toBe(false); // +
    expect(checkFullName('!@#$ $#@! !@$вич')).toBe(false);
    expect(checkFullName({})).toBe(false);
    expect(checkFullName(null)).toBe(false);
  });
});

describe('Тестирую функцию checkIdDocument', () => {
  test('Нормальные условия:', () => {
    expect(checkIdDocument('X123 X2v1 abS3 AC34')).toBe(true);
    expect(checkIdDocument('ФАСЫ 123А 123Ф авыа')).toBe(false);
    expect(checkIdDocument('!!!! 3234 3432 fFs3')).toBe(false);
    expect(checkIdDocument('dd24-3234-3432-fFs3')).toBe(true);
    expect(checkIdDocument('dd24-3234 3432-fFs3')).toBe(false);
    expect(checkIdDocument('dd24-3234 3432')).toBe(false);
    expect(checkIdDocument('dd24 3234 343 fFs3')).toBe(false);
    expect(checkIdDocument('AAAA-AAAA-AAAA-AAAA')).toBe(true);
    expect(checkIdDocument('AAAA AAAA AAAA AAAA')).toBe(true);
    expect(checkIdDocument('1234 5678 9101 1121')).toBe(true);
  });

  test('Исключительные условия:', () => {
    expect(checkIdDocument('')).toBe(false);
    expect(checkIdDocument('AAAA-AAAA-AAAA-AAAA-AAAA')).toBe(false); // +
    expect(checkIdDocument('AAAA-AAAA-AAAA AAAA-AAAA')).toBe(false);
    expect(checkIdDocument('AAAA AAAA AAAA AAAA AAAA')).toBe(false);
    expect(checkIdDocument('\ \ \ /')).toBe(false);
    expect(checkIdDocument(1111111111111)).toBe(false);
    expect(checkIdDocument({})).toBe(false);
    expect(checkIdDocument(null)).toBe(false);
  });
});
