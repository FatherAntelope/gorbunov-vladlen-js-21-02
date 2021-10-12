'use strict';

/***********
 * Объекты *
 ***********/

const animalObj = {
    _name: "Кличка",
    eat() {
        console.log(`${this._name} ест`);
    },
    say() {
        console.log("Неизвестное животное молчит");
    },
    rename(name) {
        this._name = name;
    },
    get name() {
        return this._name;
    }
};

Object.defineProperties(animalObj, {
    "_name": {configurable: false},
    "eat": {configurable: false, writable: false, enumerable: false},
    "say": {configurable: false, writable: false, enumerable: false},
    "rename": {configurable: false, writable: false, enumerable: false}
});

const catObj = {
    say() {
        console.log("Кот молчит");
    },
    hunt() {
        console.log(`${this.name} охотится`);
    }
};

Object.defineProperties(catObj, {
    "say": {configurable: false, writable: false, enumerable: false},
    "hunt": {configurable: false, writable: false, enumerable: false},
});

const dogObj = {
    say() {
        console.log("Собака молчит");
    }
};

Object.defineProperties(dogObj, {
    "say": {configurable: false, writable: false, enumerable: false}
});

const parrotObj = {
    say() {
        console.log("Попугай молчит");
    }
};

Object.defineProperties(parrotObj, {
    "say": {configurable: false, writable: false, enumerable: false}
});

Object.setPrototypeOf(catObj, animalObj);
Object.setPrototypeOf(dogObj, animalObj);
Object.setPrototypeOf(parrotObj, animalObj);

animalObj.rename("Животное")
catObj.rename("Дантес");
dogObj.rename("Зевс");
parrotObj.rename("Ричи");

console.group("Результат с объектами:");
animalObj.eat();
animalObj.say();
console.log("---------------");

catObj.eat();
catObj.hunt();
catObj.say();
console.log("---------------");

dogObj.eat();
dogObj.say();
console.log("---------------");

parrotObj.eat();
parrotObj.say();
console.groupEnd();

/************************
 * Функции-конструкторы *
 ************************/


/**********
 * Классы *
 **********/