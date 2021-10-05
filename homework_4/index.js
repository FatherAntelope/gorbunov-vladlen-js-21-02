'use strict';

/************
 * Задача 1 *
 ************/

taskOne();

function taskOne() {
    const arrStrings = prompt("Задача 1. Введите 2 строки через запятую", "")
        .split(",")
        .map((value => value.trim()));

    alert("Результат задачи №1: " + isSecondContainsFirstStr(arrStrings[0], arrStrings[1]));
}

/**
 * Функция возвращает результат вхождения второй строки в первую без учета регистра,
 * при этом вторая должна быть определена
 * @param {string} stringOne первая строка
 * @param {string} stringTwo вторая строка
 * @returns {boolean} True - входит, иначе false
 */
function isSecondContainsFirstStr(stringOne, stringTwo) {
    return !!stringTwo ? new RegExp(stringTwo, "i").test(stringOne) : false;
}

/************
 * Задача 2 *
 ************/

taskTwo();

function taskTwo() {
    let strCut = prompt("Задача 2. Введите строку и число для отсечения символов", "").trimEnd();
    let cutNum = strCut.match(/\d+$/);

    if (cutNum != null) {
        strCut = strCut.slice(0, -cutNum[0].length);
        strCut = sliceEnd(strCut, +cutNum[0]);
        alert("Результат задачи №2: " + strCut);
    } else {
        alert("Строка должна содержать число в конце для отсечения!");
    }
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

/************
 * Задача 3 *
 ************/

taskThree();

function taskThree() {
    const dataTime = "12/02/2021 12-00";
    if (/^(\d{2}\/\d{2}\/\d{4}) (\d{2}-\d{2})$/.test(dataTime)) {
        alert("Результат задачи №3: " + dataTransformation(dataTime));
    } else {
        alert("Неверно задан формат даты и времени");
    }
}

/**
 * Меняет формат даты и времени с d/m/Y h-s в d.m.Y h:s
 * @param dataTime {string} дата и время в формате d/m/Y h-s
 * @returns {string} дата и время в формате d.m.Y h:s
 */
function dataTransformation(dataTime) {
    return dataTime.replace(/\/+/g, ".").replace(/-/, ":");
}

/************
 * Задача 4 *
 ************/

taskFour();

function taskFour() {
    const fullName = prompt("Задача 4. Введите ФИО", "").trim();
    alert("Результат задачи №4: ФИО " + (checkFullName(fullName) ? "валидно" : "невалидно"));
}

/**
 * Проверяет ФИО на корректность
 * @param fullName {string}
 * @returns {boolean}
 */
function checkFullName(fullName) {
    return /^[А-я]+ [А-я]+( [А-я]*(вич|вна)$)?$/.test(fullName);
}

/************
 * Задача 5 *
 ************/

taskFive();

function taskFive() {
    let pascalCase = prompt("Задача 5. Введите строку в PascalCase").trim();
    alert("Результат задачи №5: " + pascalToSnakeCase(pascalCase));
}

function pascalToSnakeCase(pascalCase) {
    return pascalCase.split(/(?=[A-Z])/).join("_").toLowerCase();
}

/************
 * Задача 6 *
 ************/

taskSix();

function taskSix() {
    const html = prompt("Задача 6. Введите HTML c комментариями", "");
    alert("Результат задачи №6: " + getHTMLComments(html));
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

/************
 * Задача 7 *
 ************/

taskSeven();

function taskSeven() {
    const stringWithNumbers = prompt("Задача 7. Введите строку с числами", "");
    alert("Результат задачи №6: " + getNumbers(stringWithNumbers));
}

/**
 * Получает все числа из строки (положительные, отрицательные, вещественные или целые)
 * @param str {string} строка с числами
 * @returns {Array | null} массив чисел, если найдено, иначе null
 */
function getNumbers(str) {
    return str.match(/[+-]?\d+(\.?\d+)?/g);
}