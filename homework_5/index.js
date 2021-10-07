/************
 * Задача 1 *
 ************/

taskOne();

function taskOne() {
    let arr = [1, 3, 5, 4, 3, 2, 4, 5, -2, "string", 5, "string", "apple", -1, -2];
    console.group("Результат задачи 1:");
    console.table(getNonUniqueArrValue(arr));
    console.groupEnd();
}

function getNonUniqueArrValue(arr) {
    return [...new Set(arr)];
}

/************
 * Задача 2 *
 ************/

taskTwo();

function taskTwo() {
    let arr = [1, 3, 5, 4, 3, 2, 4, "0"];
    console.group("Результат задачи 2:");
    console.table(reverseArr(arr));
    console.groupEnd();
}

function reverseArr(arr) {
    return arr.map((item, index, curArr) => curArr[curArr.length - index - 1]);
    /* Доп. вариант
    return arr.reduceRight((prev, curr) => {
        prev.push(curr);
        return prev;
    }, []);
    */
}

/************
 * Задача 3 *
 ************/

taskThree();

function taskThree() {
    let arrMap = [
        ["name", "Иван"],
        ["age", 35],
        [0, "value"]
    ];
    console.group("Результат задачи 3:");
    console.log(arrMapToObjMap(arrMap));
    console.groupEnd();
}

function arrMapToObjMap(arrMap) {
    let resultObj = {};
    arrMap.forEach(([key, value]) => {
        resultObj[key] = value;
    });
    return resultObj;
    //return Object.fromEntries(new Map(arrMap)); //доп.вариант
}

/************
 * Задача 4 *
 ************/

taskFour();

function taskFour() {
    let obj = {
        name: "floor",
        height: 50,
        width: 100,
        getArea: () => this.height * this.width,
        color: "#909090",
        0: {
            test: "text"
        },
        isSquare: this.height === this.width
    };

    console.group("Результат задачи 4:");
    console.log(getSumNumericValuesObject(obj));
    console.groupEnd();
}

function getSumNumericValuesObject(obj) {
    let resultSum = 0;
    for (const key in obj) {
        if (typeof obj[key] == "number") {
            resultSum += obj[key];
        }
    }
    return resultSum;
}

/************
 * Задача 5 *
 ************/

taskFive();

function taskFive() {
    let arr = [1, 3, 5, 4, 3, 2, 4, -2];
    console.group("Результат задачи 5:");
    console.log(getAverageArr(arr));
    console.groupEnd();
}

function getAverageArr(arr) {
    return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
}
