/************
 * Задача 1 *
 ************/

taskOne();

function taskOne() {
    let arr = [1, 3, 5, 4, 3, 2, 4, 5, -2, "string", 5, "string", "apple", -1, -2];
    console.log("Результат задачи 1:");
    console.table(getNonUniqueArrValue(arr));
}

function getNonUniqueArrValue(arr) {
    return [...new Set(arr)];
}

/************
 * Задача 2 *
 ************/

taskTwo();

function taskTwo() {
    let arr = [1, 3, 5, 4, 3, 2, 4];
    console.log("Результат задачи 2:");
    console.table(reverseArr(arr));
}

function reverseArr(arr) {
    return arr.map((item, index, curArr) => curArr[curArr.length - index - 1]);
}

