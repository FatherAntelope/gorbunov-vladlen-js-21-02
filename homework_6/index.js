/************
 * Задача 1 *
 ************/

taskOne();

function taskOne() {
    console.group("Результат задачи 1:");
    console.time("Fast time");
    console.log("Fast: " + getNumFibonacciFast(41));
    console.timeEnd("Fast time");

    console.time("Slow time");
    console.log("Slow: " + getNumFibonacciSlow(41));
    console.timeEnd("Slow time");
    console.groupEnd();
}


function getNumFibonacciFast(index) {
    //Линейная рекурсия, возвращаются 2 соседних числа O(N)
    const fibonacciFastRecursion = index => {
        if (index === 0) {
            return [0, 1];
        }

        let [prevVal, nextVal] = fibonacciFastRecursion(index - 1);
        return [nextVal, prevVal + nextVal];
    };

    return fibonacciFastRecursion(index)[0];
}

//Медленная рекурсивная функция, поскольку получается дерево вложенностей из-за двух рекурсивных вызовов O(2^N)
function getNumFibonacciSlow(index) {
    return index > 1 ? getNumFibonacciSlow(index - 1) + getNumFibonacciSlow(index - 2) : index;
}

/************
 * Задача 2 *
 ************/
const getNumFibonacciCache = (() => {
    const cacheObj = {};

    function fibCacheRecursion (index) {
        if(cacheObj[index] !== undefined) {
            console.log("Возврат из кэша: " + index);
            return cacheObj[index];
        } else {
            console.log("Запись в кэш: " + index);
            return cacheObj[index] = index > 1 ?
                fibCacheRecursion(index - 1) + fibCacheRecursion(index - 2) : index;
        }
    }

    return fibCacheRecursion;
})();

taskTwo();

function taskTwo() {
    console.group("Результат задачи 2:");
    console.time("Cache time");
    console.log("Cache: " + getNumFibonacciCache(40));
    console.timeEnd("Cache time");
    console.groupEnd();
}
