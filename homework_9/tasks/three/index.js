const apiUrl = "https://swapi.dev/api/people/";

const table = document.querySelector(".table");
const tableBody = table.tBodies[0];
const tableHeader = table.tHead;
const tablePreloader = document.querySelector(".table__preloader");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

let tableData = {};

// Первоначальная выгрузка данных API в таблицу
getResponseOfJson(apiUrl).then(setLinkButtonsAndRenderTableBody).catch(console.log).finally(() => {
    tablePreloader.classList.add("table__preloader_hide");
});

// Выгрузка данных из предыдущей страницы API в таблицу
nextButton.addEventListener("click", handlerButtonClick);

// Выгрузка данных из предыдущей страницы API в таблицу
prevButton.addEventListener("click", handlerButtonClick);

function handlerButtonClick(e) {
    tableBody.innerHTML = "";
    tablePreloader.classList.remove("table__preloader_hide");
    getResponseOfJson(e.target.dataset.link).then(setLinkButtonsAndRenderTableBody).catch(console.log).finally(() => {
        tablePreloader.classList.add("table__preloader_hide");
    });
}

// Запуск сортировки таблицы
tableHeader.firstElementChild.addEventListener("click", (e) => {
    const cellTable = e.target;
    if(cellTable.tagName === "TH") {
        const sortKey = cellTable.dataset.sortkey;
        if(sortKey !== "") {
            renderArrowCellSort(cellTable);
            let sortTableData = cellTable.classList.contains("table__th_sort_down") ?
                sortArray(tableData["results"], sortKey, "DESC") :
                sortArray(tableData["results"], sortKey, "ASC");

            renderTableBody(tableBody, sortTableData);
        }
    }
});

/**
 * Рендерит стрелки направления сортировки в ячейках шапки таблицы
 * @param cellTable
 */
function renderArrowCellSort(cellTable) {
    if(!cellTable.classList.contains("table__th_sort_up") && !cellTable.classList.contains("table__th_sort_down")) {
        document.querySelectorAll(".table__th").forEach(element => {
            element.classList.remove("table__th_sort_up");
            element.classList.remove("table__th_sort_down");
        });
        cellTable.classList.add("table__th_sort_down");
    } else if(cellTable.classList.contains("table__th_sort_down")) {
        cellTable.classList.remove("table__th_sort_down");
        cellTable.classList.add("table__th_sort_up");
    } else if(cellTable.classList.contains("table__th_sort_up")) {
        cellTable.classList.remove("table__th_sort_up");
        cellTable.classList.add("table__th_sort_down");
    }
}

/**
 * Асинхронная функция (промис) для получения ответа в виде JSON из сервера
 * @param apiUrl
 * @returns {Promise<Error|any>}
 */
async function getResponseOfJson(apiUrl) {
    const response = await fetch(apiUrl);
    if(response.ok) {
        return response.json();
    } else {
        return new Error(`Ошибка с кодом ${response.status}: ${response.statusText}`)
    }
}

/**
 * Рендерит данные в теле таблицы
 * @param tableBody
 * @param tableData
 */
function renderTableBody(tableBody, tableData ) {
    tableBody.innerHTML = "";
    let tableRowHTML;
    tableData.forEach(item => {
        tableRowHTML = `
            <tr>
                <td>${item["name"]}</td>
                <td>${item["height"]}</td>
                <td>${item["mass"]}</td>
                <td>${item["gender"]}</td>
            </tr>
        `;

        tableBody.insertAdjacentHTML("beforeend", tableRowHTML);
    });
}

/**
 * Сортирует данные таблицы по возрастанию или убыванию (в том числе, если в массиве есть слова и числа)
 * @param tableData
 * @param sortKey
 * @param order
 * @returns {[{}] & *[]}
 */
function sortArray(tableData, sortKey, order = "ASC") {
    let strings = [], numbers = [];

    Array.from(tableData).forEach(item => {
        !isNaN(+item[sortKey]) ? numbers.push(item): strings.push(item);
    });

    if(order === "DESC") {
        if(strings.length > 1) {
            strings.sort((rowA, rowB) => rowA[sortKey] > rowB[sortKey] ? 1 : -1);
        }

        if(numbers.length > 1) {
            numbers.sort((rowA, rowB) => +rowA[sortKey] > +rowB[sortKey] ? 1 : -1);
        }

        return numbers.concat(strings);
    }

    if(order === "ASC") {
        if(strings.length > 1) {
            strings.sort((rowA, rowB) => rowA[sortKey] < rowB[sortKey] ? 1 : -1);
        }

        if(numbers.length > 1) {
            numbers.sort((rowA, rowB) => +rowA[sortKey] < +rowB[sortKey] ? 1 : -1);
        }

        return strings.concat(numbers);
    }
}

/**
 * Устанавливает ссылки в кнопки (вперед|назад) и рендерит данные в теле таблицы
 * @param data
 */
function setLinkButtonsAndRenderTableBody(data) {
    tableData = JSON.parse(JSON.stringify(data));

    if(tableData["next"] == null) {
        nextButton.classList.add("button__hide");
    } else {
        nextButton.classList.remove("button__hide");
        nextButton.dataset.link = tableData["next"];
    }

    if(tableData["previous"] == null) {
        prevButton.classList.add("button__hide");
    } else {
        prevButton.classList.remove("button__hide");
        prevButton.dataset.link = tableData["previous"];
    }

    document.querySelectorAll(".table__th").forEach(element => {
        element.classList.remove("table__th_sort_up");
        element.classList.remove("table__th_sort_down");
    });

    renderTableBody(tableBody, tableData["results"]);
}


