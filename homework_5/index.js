/************
 * Задача 1 *
 ************/

taskOne();

function taskOne() {
    const arr = [1, 3, 5, 4, 3, 2, 4, 5, -2, "string", 5, "string", "apple", -1, -2];
    console.group("Результат задачи 1:");
    console.table(getArrWithoutDuplicatesAll(arr));
    console.groupEnd();
}

/**
 * @description Получает массив с уникальными значениями без дубликатов
 * @param arr {object} фильтрируемый массив от дубликатов
 * @returns {object} массив уникальных значений
 */
function getArrWithoutDuplicates(arr) {
    return [...new Set(arr)];
}

/**
 * @description Получает массив без дубликатов (в том числе и сам элемент у которого есть дубликат)
 * @param arr {object} фильтрируемый массив от дубликатов
 * @returns {object} массив уникальных значений
 */
function getArrWithoutDuplicatesAll(arr) {
    let duplicateArr = arr.reduce((acc, item, index, curArr) => {
        return (acc.includes(item) === false && curArr.indexOf(item) !== index) ? acc.concat(item) : acc
    }, []);

    return duplicateArr.length > 0 ? arr.filter(item => !duplicateArr.includes(item)) : arr;
}

/************
 * Задача 2 *
 ************/

taskTwo();

function taskTwo() {
    const arr = [1, 3, 5, 4, 3, 2, 4, "0"];
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
    const arrMap = [
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
    const obj = {
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
    const arr = [1, 3, 5, 4, 3, 2, 4, -2];
    console.group("Результат задачи 5:");
    console.log(getAverageArr(arr));
    console.groupEnd();
}

function getAverageArr(arr) {
    return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
}

/************
 * Задача 6 *
 ************/

taskSix();

function taskSix() {
    const calculator = new Calculator(10);

    console.group("Результат задачи 6:");
    console.log(
        "Исходное значение: " + calculator.value +
        "\nПосле деления: " + calculator.performDivision(5) +
        "\nПосле умножения: " + calculator.performMultiplication(3) +
        "\nПосле сложения: " + calculator.performAddition(2) +
        "\nПосле вычитания: " + calculator.performSubtraction(4) +
        "\nИсходное значение: " + calculator.value
    );
    calculator.resetValue();
    console.log("Исходное значение: " + calculator.value);
    console.groupEnd();
}

/**
 * @description Функция-конструктор "Калькулятор"
 * @param value {number} исходное значение, по умолчанию - 0
 * @constructor
 */
function Calculator(value = 0) {
    this.value = value;
    this.performAddition = (addVal) => this.value += addVal;
    this.performSubtraction = (subVal) => this.value -= subVal;
    this.performMultiplication = (mulVal) => this.value *= mulVal;
    this.performDivision = (divVal) => this.value /= divVal;
    this.resetValue = () => this.value = 0;
}

/************
 * Задача 7 *
 ************/

taskSeven();

function taskSeven() {
    const arr = [-1, "name", 1.23, "strOne", {count: 5}, "strTwo", 230, {name: "Иван", age: 21}];

    console.group("Результат задачи 7:");
    console.log(getObjGroupValuesArr(arr));
    console.groupEnd();
}

function getObjGroupValuesArr(arr) {
    let resObj = {numbers: [], strings: [], objects: []};

    arr.forEach(item => {
        if (typeof item == "number") {
            resObj["numbers"].push(item);
        } else if (typeof item == "string") {
            resObj["strings"].push(item);
        } else if (typeof item === "object" && item !== null && !Array.isArray(item)) {
            resObj["objects"].push(item);
        }
    });

    return resObj;
}

/************
 * Задача 8 *
 ************/

taskEight();

function taskEight() {
    const arr = [1, 3, 5, 4, 3, 2, 4, -2];
    console.group("Результат задачи 8:");
    console.log(sliceArr(arr, 2, 7));
    console.groupEnd();
}

function sliceArr(arr, start, end) {
    return (start > end) ? arr.slice(end, start) : arr.slice(start, end);
}

/************
 * Задача 9 *
 ************/

taskNine();

function taskNine() {
    console.group("Результат задачи 9:");
    console.log(isAnagrams("сосна", "насос"));
    console.groupEnd();
}

function isAnagrams(strFirst, strSecond) {
    if (strFirst.length !== strSecond.length) {
        return false;
    }

    let firstStrArr = [...strFirst.toLowerCase()].sort(),
        secondStrArr = [...strSecond.toLowerCase()].sort();

    for (let i = 0; i < firstStrArr.length; i++) {
        if (firstStrArr[i] !== secondStrArr[i]) {
            return false;
        }
    }

    return true;
}

/*************
 * Задача 10 *
 *************/

taskTen();

function taskTen() {
    let userObj = {
        name: "Иван",
        age: 25,
        weight: 55.5,
        city: "Казань",
        cars: ["BMW", "AUDI"],
        animals: ["cat", "dog", {}],
        skills: null,
        0: {
            test: "Текст"
        },
        isSinger: false,
        printEntries: function () {
            for (let [key, value] of Object.entries(this)) {
                if (Array.isArray(value)) {
                    if (value.filter(item => item.constructor.name === "Object").length === 0) {
                        console.log(`${key}: ${value}`);
                    }
                    continue;
                }
                if (typeof value !== 'function' && (typeof value !== 'object' || value == null)) {
                    console.log(`${key}: ${value}`);
                }
            }
        }
    };

    console.group("Результат задачи 10:");
    userObj.printEntries();
    console.groupEnd();
}

/*************
 * Задача 11 *
 *************/

taskEleven();

function taskEleven() {
    let functionProps = new FunctionProps();
    functionProps.setProp("name", "Иван", {writable: false});
    functionProps.setProp("age", 27);
    functionProps.setProp("cars", ["audi", "bmw"], {enumerable: false, configurable: false});
    functionProps.setProp("height");
    functionProps.setProp("obj", {key: "value"});
    functionProps.setProp("getTestText", () => {
        return "Что-то есть"
    });

    console.group("Результат задачи 11:");
    console.table(Object.getOwnPropertyDescriptors(functionProps));
    console.log(functionProps.name);
    console.groupEnd();
}

/**
 * @description Функция-конструктор, хранящая свойства с дескрипторами
 * @constructor
 */
function FunctionProps() {
    /**
     * @description Создает новое свойство в текущем объекте
     * @param key {string} ключ свойства
     * @param value {*} значение свойства
     * @param descriptorsProp {object:{writable, configurable, enumerable}} дескрипторы свойств
     * @method
     */
    this.setProp = (key, value = null, descriptorsProp = {}) => {
        if (!this.hasOwnProperty(key)) {
            Object.defineProperty(this, key, {
                value: value,
                writable: (typeof descriptorsProp.writable == 'boolean') ? descriptorsProp.writable : true,
                configurable: (typeof descriptorsProp.configurable == 'boolean') ? descriptorsProp.configurable : true,
                enumerable: (typeof descriptorsProp.enumerable == 'boolean') ? descriptorsProp.enumerable : true
            });
        }
    }
}