import {apiUrl} from "./constants/api";
import {Table} from "./components/Table";

const tableElem: HTMLTableElement = document.querySelector(".table");


let tableClass: Table = new Table(tableElem, [
    {name: "Имя", sortKey: "name"},
    {name: "Рост", sortKey: "height"},
    {name: "Вес", sortKey: "mass"},
    {name: "Пол", sortKey: "gender"},
], apiUrl);

tableClass.startRender();
