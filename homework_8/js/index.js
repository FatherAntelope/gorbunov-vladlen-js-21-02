const form = document.querySelector(".form");
const table = document.querySelector(".table");
const tableBody = table.tBodies[0];
const tableHead = table.tHead;
const userPhone = document.getElementById("user-phone");

const replaceColorTableButtons = {
    red: document.getElementById("btn-to-red-table"),
    green: document.getElementById("btn-to-green-table"),
    cyan: document.getElementById("btn-to-cyan-table"),
}

const errorMessages = {
    name: document.getElementById("alert-danger-name"),
    phone: document.getElementById("alert-danger-phone"),
};

/**********
 * Events *
 **********/
form.addEventListener("submit", (e) => {
    let formData = Object.fromEntries(new FormData(e.target));
    if(validateForm(formData)) {
        tableBody.insertAdjacentHTML("beforeend", getRowHTML(formData))
        e.target.reset();
    }

    e.preventDefault();
});

tableBody.addEventListener("click", function (e) {
    let eventTarget = e.target;
    if (eventTarget.tagName === "A") {
        eventTarget.closest("tr").remove();
    }
    e.stopPropagation();
    e.preventDefault();
});

userPhone.addEventListener("focus", maskPhone);
userPhone.addEventListener("input", maskPhone);
userPhone.addEventListener("blur", maskPhone);

replaceColorTableButtons["red"].addEventListener("click", ()=> {
    if(!replaceColorTableButtons["red"].classList.contains("button_active")) {
        replaceColorTableButtons["red"].classList.add("button_active")
        replaceColorTableButtons["green"].classList.remove("button_active");
        replaceColorTableButtons["cyan"].classList.remove("button_active");

        tableHead.classList.add("table__head_color_red");
        tableHead.classList.remove("table__head_color_cyan");
        tableHead.classList.remove("table__head_color_green");

        tableBody.classList.add("table__body_color_red");
        tableBody.classList.remove("table__body_color_cyan");
        tableBody.classList.remove("table__body_color_green");
    } else {
        replaceColorTableButtons["red"].classList.remove("button_active");

        tableHead.classList.remove("table__head_color_red");
        tableBody.classList.remove("table__body_color_red");
    }
});

replaceColorTableButtons["green"].addEventListener("click", ()=> {
    if(!replaceColorTableButtons["green"].classList.contains("button_active")) {
        replaceColorTableButtons["green"].classList.add("button_active")
        replaceColorTableButtons["red"].classList.remove("button_active");
        replaceColorTableButtons["cyan"].classList.remove("button_active");

        tableHead.classList.add("table__head_color_green");
        tableHead.classList.remove("table__head_color_red");
        tableHead.classList.remove("table__head_color_cyan");

        tableBody.classList.add("table__body_color_green");
        tableBody.classList.remove("table__body_color_red");
        tableBody.classList.remove("table__body_color_cyan");
    } else {
        replaceColorTableButtons["green"].classList.remove("button_active");

        tableHead.classList.remove("table__head_color_green");
        tableBody.classList.remove("table__body_color_green");
    }
});

replaceColorTableButtons["cyan"].addEventListener("click", ()=> {
    if(!replaceColorTableButtons["cyan"].classList.contains("button_active")) {
        replaceColorTableButtons["cyan"].classList.add("button_active")
        replaceColorTableButtons["red"].classList.remove("button_active");
        replaceColorTableButtons["green"].classList.remove("button_active");

        tableHead.classList.add("table__head_color_cyan");
        tableHead.classList.remove("table__head_color_red");
        tableHead.classList.remove("table__head_color_green");

        tableBody.classList.add("table__body_color_cyan");
        tableBody.classList.remove("table__body_color_red");
        tableBody.classList.remove("table__body_color_green");
    } else {
        replaceColorTableButtons["cyan"].classList.remove("button_active");

        tableHead.classList.remove("table__head_color_cyan");
        tableBody.classList.remove("table__body_color_cyan");
    }
});


/*************
 * Functions *
 *************/

function getRowHTML(item) {
    return `
        <tr>
            <td>${item["user-name"]}</td>
            <td>${item["user-phone"]}</td>
            <td>
                <a href="#" class="table__del-link">Удалить</a>
            </td>
        </tr>
    `;
}

function validateForm(formData) {
    let flag = true;
    if (!/^[A-zА-я]{3,16}$/.test(formData["user-name"])) {
        errorMessages["name"].classList.remove("alert_hidden");
        flag = false;
    } else {
        if(!errorMessages["name"].classList.contains("alert_hidden")) {
            errorMessages["name"].classList.add("alert_hidden");
        }
    }

    if (!/^\+(\d) (\(\d{2,3}\)) (\d{3}) (\d{2})-(\d{2})$/.test(formData["user-phone"])) {
        errorMessages["phone"].classList.remove("alert_hidden");
        flag = false;
    } else {
        if(!errorMessages["phone"].classList.contains("alert_hidden")) {
            errorMessages["phone"].classList.add("alert_hidden");
        }
    }

    return flag;
}

function maskPhone(e) {
    const mask = '+7 (___) ___ __-__'
    const keyCode = e.keyCode;
    const value = e.target.value.replace(/\D/g, "");

    let index = 0;
    let newValue = mask.replace(/[_\d]/g,  item => index < value.length ?
            value.charAt(index++) || mask.replace(/\D/g, "").charAt(index) :
            item
        );

    index = newValue.indexOf("_");

    if (index !== -1) {
        newValue = newValue.slice(0, index);
    }

    let regex = mask.substr(0, e.target.value.length)
        .replace(/_+/g, item => "\\d{1," + item.length + "}")
        .replace(/[+()]/g, "\\$&");

    regex = new RegExp("^" + regex + "$");

    if (e.target.value.length < 5 || keyCode > 47 && keyCode < 58 || !regex.test(e.target.value)) {
        e.target.value = newValue;
    }

    if (e.type === "blur" && e.target.value.length < 5) {
        e.target.value = "";
    }
}




