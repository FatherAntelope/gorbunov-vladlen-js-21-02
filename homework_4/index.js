'use strict';
/************
 * Задача 1 *
 ************/

taskOne();

function taskOne() {
    let arrStrings = prompt("Задача 1. Введите 2 строки через запятую")
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





