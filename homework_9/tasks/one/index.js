const buttonTimeout = document.getElementById("button-timeout");
const buttonInterval = document.getElementById("button-interval");

const alertStepperTimeout = document.getElementById("alert-stepper-timeout");
const alertStepperInterval = document.getElementById("alert-stepper-interval");
let timeout, interval;

buttonTimeout.addEventListener("click", () => {
    clearTimeout(timeout);
    let i = +document.getElementById("num-i-timeout").value,
        j = +document.getElementById("num-j-timeout").value;
    if (i < j) {
        counterTimeout(alertStepperTimeout, i, j, true);
    } else if (i > j) {
        counterTimeout(alertStepperTimeout, i, j, false);
    } else {
        alertStepperTimeout.innerText = i.toString();
    }
});

function counterTimeout(element, i, j, isUp = true) {
    startTimeout();

    function startTimeout() {
        element.innerText = i.toString();
        if (i !== j) {
            i = isUp ? i + 1 : i - 1;
            timeout = setTimeout(startTimeout, 1000);
        }
    }
}

buttonInterval.addEventListener("click", () => {
    clearInterval(interval);
    let i = +document.getElementById("num-i-interval").value,
        j = +document.getElementById("num-j-interval").value;
    if (i < j) {
        counterInterval(alertStepperInterval, i, j, true);
    } else if (i > j) {
        counterInterval(alertStepperInterval, i, j, false);
    } else {
        alertStepperInterval.innerText = i.toString();
    }
});


function counterInterval(element, i, j, isUp = true) {
    interval = setInterval(() => {
        element.innerText = i.toString();
        if (i === j) {
            clearInterval(interval);
        }
        i = isUp ? i + 1 : i - 1;
    }, 1000);
}
