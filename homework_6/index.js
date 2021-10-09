/************
 * Задача 1 *
 ************/

taskOne();

function taskOne() {
    console.log("Результат задачи 1 (fast): " + getNumFibonacciFast(40));
    console.log("Результат задачи 1 (slow): " + getNumFibonacciSlow(40));
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
            console.log("Возврат из кэша");
            return cacheObj[index];
        } else {
            console.log("Запись в кэш");
            return cacheObj[index] = index > 1 ?
                fibCacheRecursion(index - 1) + fibCacheRecursion(index - 2) : index;
        }
    }

    return fibCacheRecursion;
})();

taskTwo();

function taskTwo() {
    console.group("Результат задачи 2:");
    console.log(getNumFibonacciCache(40));
    console.groupEnd();
}