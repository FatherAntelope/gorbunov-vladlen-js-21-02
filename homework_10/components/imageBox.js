function renderImageBox(elementWrapper, title, url) {
    let HTML = `
            <div class="col">
                <div class="image-card">
                    <h3 class="image-card__title">${title}</h3>
                    <div class="image-card__body">
                        <img class="image-card__image" src="${url}" alt="${title}">
                    </div>
                </div>
            </div>
    `;
    elementWrapper.insertAdjacentHTML("beforeend", HTML);
}

function renderImageBoxAll(elementWrapper, images) {
    const N = images.length;
    let steps = 0;
    let interval = setInterval(() => {
        renderImageBox(elementWrapper, images[steps]["title"], images[steps]["url"])
        steps++
        if(steps >= N) {
            clearInterval(interval);
        }
    }, 60)
}

export {renderImageBox, renderImageBoxAll};