/**
 * Функция возвращает результат вхождения второй строки в первую без учета регистра,
 * при этом вторая должна быть определена
 * @param {string} stringOne первая строка
 * @param {string} stringTwo вторая строка
 * @returns {boolean} True - входит, иначе false
 */
function isSecondContainsFirstStr(stringOne, stringTwo) {
  if (typeof stringOne === 'object' || typeof stringTwo === 'object') return false;
  return (stringOne && stringTwo) ? String(stringOne).toLowerCase().includes(String(stringTwo).toLowerCase()) : false;
}

/**
 * Функция отсекает с конца строки заданное количество символов
 * @param str {string} отсекаемая строка
 * @param countSymbols {number} количество отсекаемых символов
 * @returns {string} если countSymbols > 0 - результат отсечение, иначе str
 */
function sliceEnd(str, countSymbols) {
  if (typeof str === 'object' || typeof countSymbols === 'object') return '';
  str = String(str || '');
  if (str.length === countSymbols || str.length === 0) return '';
  return (countSymbols > 0) ? `${str.slice(0, -countSymbols).trimEnd()}...` : str;
}

/**
 * Меняет формат даты и времени с d/m/Y h-s в d.m.Y h:s
 * @param dataTime {string} дата и время в формате d/m/Y h-s
 * @returns {string} дата и время в формате d.m.Y h:s
 */
function dataTransformation(dataTime) {
  return dataTime.replace(/\/+/g, ".").replace(/-/, ":");
}

/**
 * Проверяет ФИО на корректность
 * @param fullName {string}
 * @returns {boolean}
 */
function checkFullName(fullName) {
  fullName = String(fullName).trim().toLowerCase();
  if (/^[A-z]$/.test(fullName)) return false;
  return /^[А-я]+[ ]{1,}[А-я]+[ ]{0,}([А-я]*(вич|вна)$)?$/.test(fullName);
}

/**
 * Конвертирует из PascalCase в snake_case
 * @param pascalCase {string}
 * @returns {string}
 */
function pascalToSnakeCase(pascalCase) {
  if (!pascalCase || typeof pascalCase === 'object') return '';
  pascalCase = String(pascalCase).trim();
  const arrPascalCase = pascalCase.split(' ');
  if (arrPascalCase.length > 0) {
    return arrPascalCase.map((item) => item.split(/(?=[A-Z])/).join("_").toLowerCase()).join(' ');
  }
  return pascalCase && pascalCase.split(/(?=[A-Z])/).join("_").toLowerCase();
}

/**
 * Получает массив комментариев и убирает с каждого элемента массива спецсимволы
 * @param html {string} html разметка
 * @returns {Array | null} массив комментариев, если есть, иначе null
 */
function getHTMLComments(html) {
  const htmlComments = html.match(/(<!--[\S\s]+?-->)/g);
  return (htmlComments != null) ?
    htmlComments.map(value => {
      return value.replace(/^<!--/, "").replace(/-->$/, "")
    })
    : null;
}

/**
 * Получает все числа из строки (положительные, отрицательные, вещественные или целые)
 * @param str {string} строка с числами
 * @returns {Array<number> | null} массив чисел, если найдено, иначе null
 */
function getNumbers(str) {
  const arrStr = String(str).match(/[+-]?\d+(\.?\d+)?/g) || [];
  return arrStr.length > 0 ? arrStr.map(item => Number(item)) : null;
}

/**
 * Проверяет идентификатор документа в формате XXXX XXXX XXXX XXXX или XXXX-XXXX-XXXX-XXXX
 * @param idDocument {string} идентификатор документа
 * @returns {boolean} True - верный идентификатор, иначе - неверный
 */
function checkIdDocument(idDocument) {
  //Или /^(([0-9A-z]{4})[- ]){3}([0-9A-z]{4})$/ если нужно комбинировать [- ]
  return /^(((([0-9A-z]{4}) ){3}([0-9A-z]{4}))|((([0-9A-z]{4})-){3}([0-9A-z]{4})))$/.test(idDocument);
}

export {
  isSecondContainsFirstStr, sliceEnd, dataTransformation, checkFullName, pascalToSnakeCase, getHTMLComments,
  getNumbers, checkIdDocument
};
