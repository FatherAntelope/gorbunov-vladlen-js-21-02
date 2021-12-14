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
    expect(sliceEnd(str, 3)).toBe('Стр...');
    expect(sliceEnd(str, 0)).toBe(str);
    expect(sliceEnd(str, 6)).toBe(''); // +
    expect(sliceEnd('Волк - не тигр', 4)).toBe('Волк - не...');
    expect(sliceEnd('@', 1)).toBe('');
    expect(sliceEnd('E!@#$%^&*()_', 2)).toBe('E!@#$%^&*(...');
  });

  test('Исключительные условия:', () => {
    expect(sliceEnd(str, -2)).toBe(str);
    expect(sliceEnd('', 1)).toBe(''); // +
    expect(sliceEnd('@', 1)).toBe('');
    expect(sliceEnd(-123212.235043, 3)).toBe('-123212.235...');
    expect(sliceEnd(str)).toBe(str);
    expect(sliceEnd()).toBe(''); // +
    expect(sliceEnd(str, 2.2)).toBe('Стро...');
    expect(sliceEnd(str, 2.9)).toBe('Стро...');
    expect(sliceEnd({}, {})).toBe(''); // !
  });
});

describe('Тестирую функцию pascalToSnakeCase', () => {
  test('Нормальные условия:', () => {
    expect(pascalToSnakeCase('PascalCase')).toBe('pascal_case');
    expect(pascalToSnakeCase('ButtonForSend')).toBe('button_for_send');
    expect(pascalToSnakeCase('JS')).toBe('j_s');
    expect(pascalToSnakeCase('J')).toBe('j');
    expect(pascalToSnakeCase('!£$F')).toBe('!£$_f');
    expect(pascalToSnakeCase('PascalCase1@Snake')).toBe('pascal_case1@_snake');
    expect(pascalToSnakeCase(' PascalCase ')).toBe('pascal_case'); // +
    expect(pascalToSnakeCase(' PascalCase AndArr@ he')).toBe('pascal_case and_arr@ he'); // +
  });

  test('Исключительные условия:', () => {
    expect(pascalToSnakeCase('')).toBe('');
    expect(pascalToSnakeCase()).toBe(''); // !
    expect(pascalToSnakeCase(123)).toBe('123');
    expect(pascalToSnakeCase(null)).toBe('');
    expect(pascalToSnakeCase({})).toBe(''); // !
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

describe('Тестирую функцию getNumbers', () => {
  test('Нормальные условия:', () => {
    expect(getNumbers('Егору 12 лет')).toEqual([12]);
    expect(getNumbers('Str5.8 str')).toEqual([5.8]);
    expect(getNumbers('Str5.8 str7al wor1.334ld')).toEqual([5.8, 7, 1.334]);
    expect(getNumbers('Str5.8 0 f-4 2 -2.31 .2')).toEqual([5.8, 0, -4, 2, -2.31, 2]);
    expect(getNumbers('23 @-24^!')).toEqual([23, -24]);
    expect(getNumbers('5.8-3.4')).toEqual([5.8, -3.4]);
    expect(getNumbers('Hello, world!')).toBeNull(); // +
  });

  test('Исключительные условия:', () => {
    expect(getNumbers('-5.83.4')).toEqual([-5.83, 4]);
    expect(getNumbers(5)).toEqual([5]); // +
    expect(getNumbers()).toBeNull();
    expect(getNumbers('')).toBeNull();
    expect(getNumbers(null)).toBeNull();
    expect(getNumbers({})).toBeNull();
    expect(getNumbers([5, 4])).toEqual([5, 4]);
    expect(getNumbers([5, 'Word', -34, 0.78])).toEqual([5, -34, 0.78]);
  });
});

describe('Тестирую функцию dataTransformation', () => {
  test('Нормальные условия:', () => {
    expect(dataTransformation('12/02/2021 12-00')).toBe('12.02.2021 12:00');
    expect(dataTransformation('28/07/2035')).toBe('28.07.2035');
    expect(dataTransformation('15-00')).toBe('15:00');
    expect(dataTransformation('')).toBe('');
    expect(dataTransformation('1/2/21')).toBe('');
    expect(dataTransformation('12/02/21 5-00')).toBe('5:00');
    expect(dataTransformation('15-0')).toBe('');
  });

  test('Исключительные условия:', () => {
    expect(dataTransformation('   12/02/2021  12-00 ')).toBe('12.02.2021 12:00'); // +
    expect(dataTransformation(6)).toBe('');
    expect(dataTransformation(null)).toBe(''); // +
    expect(dataTransformation('zz/zz/zzzz zz-zz')).toBe('');
    expect(dataTransformation('1.22/2.12/2.1222 22-22')).toBe('22:22');
    expect(dataTransformation('Какая-то дата 2.22/12/2022 23-00')).toBe('22.12.2022 23:00');
    expect(dataTransformation({})).toBe('');
  });
});
