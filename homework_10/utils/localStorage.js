function addItemObjToLocalStorage(key, obj) {
    let arrObj = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
    arrObj.push(obj);
    localStorage.setItem(key, JSON.stringify(arrObj));
}

function getItemLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export {addItemObjToLocalStorage, getItemLocalStorage};