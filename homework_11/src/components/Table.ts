type THeadersTitle = {
    name: string;
    sortKey: string;
};

type TRowData = {
    [key: string]: string | number;
};

type TApiData = {
    next: string | null;
    previous: string | null;
    results: TRowData[];
};

interface ITable {
    startRender(): void;
}

class Table implements ITable {
    private body: HTMLElement;
    private header: HTMLElement;
    private wrapper: HTMLTableElement;
    private nextButton: HTMLElement;
    private prevButton: HTMLElement;
    private headersTitle: THeadersTitle[];
    private preloader: HTMLElement;
    private apiData: TApiData;
    private apiURL: string;

    constructor(tableElem: HTMLTableElement, headersTitle: THeadersTitle[], apiURL: string) {
        this.wrapper = tableElem;
        this.header = tableElem.tHead;
        this.headersTitle = headersTitle;
        this.apiURL = apiURL;
    }

    private renderHeader(): void {
        this.header = document.createElement("thead");
        this.header.classList.add("table__head");
        this.wrapper.append(this.header);

        let HTML: string = "<tr>";
        this.headersTitle.forEach(item => {
            HTML += `
                <th class="table__th" data-sortkey="${item["sortKey"]}">${item["name"]}</th>
            `;
        });

        HTML += "</tr>";
        this.header.insertAdjacentHTML('beforeend', HTML);

        this.header.firstElementChild.addEventListener("click", (e) => {
            this.handlerCellsHeaderClick(e);
        });
    }

    private renderBody(): void {
        this.body = document.createElement("tbody");
        this.body.classList.add("table__body");
        this.wrapper.append(this.body);
    }

    private renderFooter(): void {
        const HTML: string = `
            <tfoot class="table__foot">
                <tr class="table__preloader">
                    <td colspan="${this.headersTitle.length}">
                        <span class="spinner"></span>
                    </td>
                </tr>
                <tr>
                    <td colspan=${this.headersTitle.length}">
                        <button type="button" class="button button__hide" id="prev-button">Назад</button>
                        <button type="button" class="button button__hide" id="next-button">Вперед</button>
                    </td>
                </tr>
            </tfoot>
        `;
        this.wrapper.insertAdjacentHTML('beforeend', HTML);

        this.nextButton = document.getElementById("next-button");
        this.prevButton = document.getElementById("prev-button");
        this.preloader = document.querySelector(".table__preloader");

        this.nextButton.addEventListener("click", (e) => {
            this.handlerButtonClick(e)
        });
        this.prevButton.addEventListener("click", (e) => {
            this.handlerButtonClick(e)
        });
    }

    public startRender(): void {
        this.renderHeader();
        this.renderBody();
        this.renderFooter();
        this.getResponseOfJson(this.apiURL)
            .then((data) => {
                this.setLinkButtonsAndRenderTableBody(data)
            })
            .catch(console.log)
            .finally(() => {
                this.preloader.classList.add("table__preloader_hide");
            });
    }

    private handlerButtonClick(e: Event): void {
        this.body.innerHTML = "";
        this.preloader.classList.remove("table__preloader_hide");
        this.getResponseOfJson((e.target as HTMLElement).dataset.link)
            .then((data) => {
                this.setLinkButtonsAndRenderTableBody(data)
            })
            .catch(console.log)
            .finally(() => {
                this.preloader.classList.add("table__preloader_hide");
            });
    }

    private handlerCellsHeaderClick(e: Event): void {
        const cellTable = e.target as HTMLElement;
        if (cellTable.tagName === "TH") {
            const sortKey = cellTable.dataset.sortkey as string | number;
            if (sortKey !== "") {
                this.renderArrowCellSort(cellTable);
                let sortTableData: TRowData[] = cellTable.classList.contains("table__th_sort_down") ?
                    this.sortArray(this.apiData["results"], sortKey, "DESC") :
                    this.sortArray(this.apiData["results"], sortKey, "ASC");

                this.renderBodyRows(sortTableData);
            }
        }
    }

    private sortArray(tableData: TRowData[], sortKey: string | number, order: string = "ASC"): TRowData[] {
        let strings: TRowData[] = [], numbers: TRowData[] = [];

        Array.from(tableData).forEach(item => {
            !isNaN(+item[sortKey]) ? numbers.push(item) : strings.push(item);
        });

        if (order === "DESC") {
            if (strings.length > 1) {
                strings.sort((rowA, rowB) => rowA[sortKey] > rowB[sortKey] ? 1 : -1);
            }

            if (numbers.length > 1) {
                numbers.sort((rowA, rowB) => +rowA[sortKey] > +rowB[sortKey] ? 1 : -1);
            }

            return numbers.concat(strings);
        }

        if (order === "ASC") {
            if (strings.length > 1) {
                strings.sort((rowA, rowB) => rowA[sortKey] < rowB[sortKey] ? 1 : -1);
            }

            if (numbers.length > 1) {
                numbers.sort((rowA, rowB) => +rowA[sortKey] < +rowB[sortKey] ? 1 : -1);
            }

            return strings.concat(numbers);
        }
    }


    private renderArrowCellSort(cellTable: HTMLElement): void {
        if (!cellTable.classList.contains("table__th_sort_up") && !cellTable.classList.contains("table__th_sort_down")) {
            document.querySelectorAll(".table__th").forEach(element => {
                element.classList.remove("table__th_sort_up");
                element.classList.remove("table__th_sort_down");
            });
            cellTable.classList.add("table__th_sort_down");
        } else if (cellTable.classList.contains("table__th_sort_down")) {
            cellTable.classList.remove("table__th_sort_down");
            cellTable.classList.add("table__th_sort_up");
        } else if (cellTable.classList.contains("table__th_sort_up")) {
            cellTable.classList.remove("table__th_sort_up");
            cellTable.classList.add("table__th_sort_down");
        }
    }

    private renderBodyRows(tableData: TRowData[]): void {
        this.body.innerHTML = "";
        let tableRowHTML: string;
        tableData.forEach(item => {
            tableRowHTML = `
                <tr>
                    <td>${item["name"]}</td>
                    <td>${item["height"]}</td>
                    <td>${item["mass"]}</td>
                    <td>${item["gender"]}</td>
                </tr>
            `;

            this.body.insertAdjacentHTML("beforeend", tableRowHTML);
        });
    }

    private async getResponseOfJson(apiUrl: string): Promise<TApiData> {
        const response: Response = await fetch(apiUrl);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Ошибка с кодом ${response.status}: ${response.statusText}`)
        }
    }

    private setLinkButtonsAndRenderTableBody(apiData: TApiData): void {
        this.apiData = JSON.parse(JSON.stringify(apiData));
        this.buttonsDisplay(apiData);
        this.renderBodyRows(apiData["results"]);
    }

    private buttonsDisplay(apiData: TApiData): void {
        if (apiData["next"] == null) {
            this.nextButton.classList.add("button__hide");
        } else {
            this.nextButton.classList.remove("button__hide");
            this.nextButton.dataset.link = apiData["next"];
        }

        if (apiData["previous"] == null) {
            this.prevButton.classList.add("button__hide");
        } else {
            this.prevButton.classList.remove("button__hide");
            this.prevButton.dataset.link = apiData["previous"];
        }

        document.querySelectorAll(".table__th").forEach(element => {
            element.classList.remove("table__th_sort_up");
            element.classList.remove("table__th_sort_down");
        });
    }
}

export {Table};

Object.defineProperty(this, "age", {

})