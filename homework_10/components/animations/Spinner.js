function Spinner(element, steps, speed) {
    this.element = element;
    let interval;
    let deg = 0;

    this.stop = function () {
        clearInterval(interval);
    }

    this.start = function () {
        interval = setInterval(() => {
            deg = deg < 360 ? deg + steps : 0;
            this.element.style.transform = "rotate(" + deg + "deg)";
        }, speed);
    }
}

export {Spinner};