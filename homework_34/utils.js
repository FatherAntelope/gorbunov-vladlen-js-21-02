/**
 * Функция возвращает результат вхождения второй строки в первую без учета регистра,
 * при этом вторая должна быть определена
 * @param {string} stringOne первая строка
 * @param {string} stringTwo вторая строка
 * @returns {boolean} True - входит, иначе false
 */
function isSecondContainsFirstStr(stringOne, stringTwo) {
  return (stringOne && stringTwo) ? String(stringOne).toLowerCase().includes(String(stringTwo).toLowerCase()) : false;
}

/**
 * Функция отсекает с конца строки заданное количество символов
 * @param str {string} отсекаемая строка
 * @param countSymbols {number} количество отсекаемых символов
 * @returns {string} если countSymbols > 0 - результат отсечение, иначе str
 */
function sliceEnd(str, countSymbols) {
  return (countSymbols > 0) ? str.slice(0, -countSymbols).trimEnd() + "..." : str;
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
  return /^[А-я]+ [А-я]+( [А-я]*(вич|вна)$)?$/.test(fullName);
}

/**
 * Конвертирует из PascalCase в snake_case
 * @param pascalCase {string}
 * @returns {string}
 */
function pascalToSnakeCase(pascalCase) {
  return pascalCase.split(/(?=[A-Z])/).join("_").toLowerCase();
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
 * @returns {Array | null} массив чисел, если найдено, иначе null
 */
function getNumbers(str) {
  return str.match(/[+-]?\d+(\.?\d+)?/g);
}

/**
 * Проверяет идентификатор документа в формате XXXX XXXX XXXX XXXX или XXXX-XXXX-XXXX-XXXX
 * @param idDocument {string} идентификатор документа
 * @returns {boolean} True - верный идентификатор, иначе - неверный
 */
function checkIdDocument(idDocument) {
  //Или /^(([0-9A-z]{4})[- ]){3}([0-9A-z]{4})$/ если нужно комбинировать [- ]
  return /^((([0-9A-z]{4}) ){3}([0-9A-z]{4}))|((([0-9A-z]{4})-){3}([0-9A-z]{4}))$/.test(idDocument);
}

export {
  isSecondContainsFirstStr, sliceEnd, dataTransformation, checkFullName, pascalToSnakeCase, getHTMLComments,
  getNumbers, checkIdDocument
};
