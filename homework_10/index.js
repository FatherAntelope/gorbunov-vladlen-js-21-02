import {API_KEY, MAIN_API_URL} from "./constants/api.js";
import {APIRequest} from "./utils/APIRequest.js";
import {fileConvertToBase64} from "./utils/fileConvert.js";
import {Spinner as AnimationSpin} from "./components/animations/Spinner.js";
import * as LocalStorage from "./utils/localStorage.js";
import * as ImageBox from "./components/imageBox.js";

const form = document.getElementById("form-send-img");
const fileInput = document.getElementById("file-input");
const fileName = document.getElementById("file-name");
const button = document.getElementById("button");
const spinner = document.getElementById("spinner");
const rowImages = document.getElementById("row-images");

// Выгрузка и рендеринг изображений из локального хранилища
if (LocalStorage.getItemLocalStorage("images") != null) {
    ImageBox.renderImageBoxAll(rowImages, LocalStorage.getItemLocalStorage("images"));
}

form.addEventListener("submit", (e) => {
    let fileImg = new FormData(e.target).get("user_img");
    if (fileImg.size !== 0) {
        let animationSpin = new AnimationSpin(spinner, 10, 25);
        const bodyData = new FormData();

        animationSpin.start();
        button.setAttribute("disabled", "disabled");
        spinner.classList.remove("spinner_hide");

        (async () => {
            // Конвертация изображения в формат base64
            const base64img = await fileConvertToBase64(fileImg)
                .then(base64 => base64)
                .catch(error => {
                    resetItemsLoad(animationSpin, spinner, button);
                    console.log(error);
                });

            // Заполнение тела для API
            bodyData.set("key", API_KEY);
            bodyData.set("image", base64img.toString());
            bodyData.set("name", fileImg.name);

            // Отправка изображения на сервер
            const apiRequest = new APIRequest(MAIN_API_URL);
            const dataResponse = await apiRequest.getDataResponsePost("/1/upload", bodyData);

            // Добавление данных изображения (от сервера) в локальное хранилище
            LocalStorage.addItemObjToLocalStorage("images", {
                title: dataResponse["title"], url: dataResponse["url"]
            });


            resetItemsLoad(animationSpin, spinner, button);

            // Рендер одного изображения
            ImageBox.renderImageBox(rowImages, dataResponse["title"], dataResponse["url"]);
        })();
    }

    if (!fileName.classList.contains("form__file-name_hide")) {
        fileName.classList.add("form__file-name_hide");
    }

    form.reset();
    e.preventDefault();
});

// Отображение имени файла после его выбора
fileInput.addEventListener("change", (e) => {
    if (e.target.value !== "") {
        fileName.classList.remove("form__file-name_hide");
        fileName.firstElementChild.innerHTML = e.target.value.replace(/^.*\\/, '')
    } else {
        fileName.firstElementChild.innerHTML = "";
        if (!fileName.classList.contains("form__file-name_hide")) {
            fileName.classList.add("form__file-name_hide");
        }
    }
});

// Сброс элементов загрузки (в их начальное состояние)
function resetItemsLoad(animation, spinner, button) {
    animation.stop();
    spinner.classList.add("spinner_hide");
    button.removeAttribute("disabled");
}

