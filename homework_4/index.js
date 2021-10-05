'use strict';
/************
 * Задача 1 *
 ************/

taskOne();

function taskOne() {
    let arrStrings = prompt("Задача 1. Введите 2 строки через запятую", "")
        .split(",")
        .map((value => value.trim()));

    alert("Результат задачи №1: " + isSecondContainsFirstStr(arrStrings[0], arrStrings[1]));
}

/**
 * Функция возвращает результат вхождения второй строки в первую без учета регистра,
 * при этом вторая должна быть определена
 * @param {String} stringOne первая строка
 * @param {String} stringTwo вторая строка
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

    if(cutNum != null) {
        strCut = strCut.slice(0, -cutNum[0].length);
        strCut =  sliceEnd(strCut, +cutNum[0]);
        alert("Результат задачи №2: " + strCut);
    } else {
        alert("Строка должна содержать число в конце для отсечения!");
    }
}

/**
 * Функция отсекает с конца строки заданное количество символов
 * @param str {String} отсекаемая строка
 * @param countSymbols {Number} количество отсекаемых символов
 * @returns {String} если countSymbols > 0 - результат отсечение, иначе str
 */
function sliceEnd(str, countSymbols) {
    return (countSymbols > 0) ? str.slice(0, -countSymbols).trimEnd() + "..." : str;
}

