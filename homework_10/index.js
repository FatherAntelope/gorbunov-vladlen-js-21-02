import {API_KEY, MAIN_API_URL} from "./constants/api.js";
import {APIRequest} from "./utils/APIRequest.js";
import {fileConvertToBase64} from "./utils/fileConvert.js";
import {Spinner as AnimationSpin} from "./components/animations/Spinner.js";


const form = document.getElementById("form-send-img");
const fileInput = document.getElementById("file-input");
const fileName = document.getElementById("file-name");
const button = document.getElementById("button");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", (e) => {
    let fileImg = new FormData(e.target).get("user_img");
    if(fileImg.size !== 0) {
        let animationSpin = new AnimationSpin(spinner, 10, 25);
        button.setAttribute("disabled", "disabled");
        spinner.classList.remove("spinner_hide");

        animationSpin.start();
        const bodyData = new FormData();
        (async function result () {
            const base64img = await fileConvertToBase64(fileImg)
                .then(base64 => base64)
                .catch((error) => {
                    animationSpin.stop();
                    spinner.classList.add("spinner_hide");
                    button.removeAttribute("disabled");

                    console.log(error);
                })
                .finally();

            bodyData.set("key", API_KEY);
            bodyData.set("image", base64img.toString());
            bodyData.set("name", fileImg.name);

            const apiRequest = new APIRequest(MAIN_API_URL);
            const urlIMG = await apiRequest.getDataResponsePost("/1/upload", bodyData);

            animationSpin.stop();
            spinner.classList.add("spinner_hide");
            button.removeAttribute("disabled");


            console.log(urlIMG);
        })();
    }

    e.preventDefault();
});

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

