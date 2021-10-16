const seconds = document.getElementById("seconds");
const secondsText = document.getElementById("text");
let countdown = +seconds.dataset.value;

seconds.innerText = countdown.toString();
secondsText.innerText = declensionTextSeconds(countdown);

timerRedirection(countdown, seconds, secondsText, "https://maxima.life");

function timerRedirection(countdown, secondsElement, secondsTextElement,  url) {
    let interval = setInterval(() => {
        countdown--;
        if(countdown <= 0 ) {
            clearInterval(interval);
            location.href = url;
        }
        secondsElement.innerText = countdown.toString();
        secondsTextElement.innerText = declensionTextSeconds(countdown);
    }, 1000);
}

function declensionTextSeconds(number) {
    const keysText = [2, 0, 1, 1, 1, 2];
    const text = ['секунду', 'секунды', 'секунд'];
    return text[(number % 100 > 4 && number % 100 < 20) ? 2 : keysText[(number % 10 < 5) ? number % 10 : 5]];
}


