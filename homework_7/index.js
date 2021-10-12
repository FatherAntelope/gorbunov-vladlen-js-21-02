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
    "name": {configurable: false, enumerable: false},
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

Object.defineProperty(dogObj, "say", {configurable: false, writable: false, enumerable: false});

const parrotObj = {
    say() {
        console.log("Попугай молчит");
    }
};

Object.defineProperty(parrotObj, "say", {configurable: false, writable: false, enumerable: false});

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

function AnimalFunc(name) {
    this._name = name;
    this.eat = function () {
        console.log(`${this._name} ест`);
    }

    this.rename = function (name) {
        this._name = name;
    }

    this._say = function () {
        console.log("Неизвестное животное молчит")
    }

    Object.defineProperties(this, {
        "_name": {configurable: false},
        "name": {
            get() {
                return this._name
            }, configurable: false, enumerable: false
        },
        "_say": {configurable: false, enumerable: false},
        "say": {
            value: function () {
                this._say();
            },
            configurable: false, enumerable: false, writable: false
        },
        "eat": {configurable: false, writable: false, enumerable: false},
        "rename": {configurable: false, writable: false, enumerable: false}
    });
}

function CatFunc(name) {
    AnimalFunc.call(this, name);
    this.hunt = function () {
        console.log(`${this.name} охотится`);
    }
    this._say = function () {
        console.log("Кот молчит")
    }
    Object.defineProperty(this, "hunt", {configurable: false, writable: false, enumerable: false});
}

function DogFunc(name) {
    AnimalFunc.call(this, name);
    this._say = function () {
        console.log("Собака молчит")
    }
}

function ParrotFunc(name) {
    AnimalFunc.call(this, name);
    this._say = function () {
        console.log("Попугай молчит")
    }
}

const animalF = new AnimalFunc("Животное"),
    catF = new CatFunc("Снежок"),
    dogF = new DogFunc("Шарик"),
    parrotF = new ParrotFunc("Кеша");

console.group("Результат с функциями-конструкторами:");
animalF.eat();
animalF.say();
console.log("---------------");

catF.eat();
catF.hunt();
catF.say();
console.log("---------------");

dogF.eat();
dogF.say();
console.log("---------------");

parrotF.eat();
parrotF.say();
console.groupEnd();

/**********
 * Классы *
 **********/