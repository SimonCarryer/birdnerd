
function buildCard(bird) {
    let div = document.createElement("div");
    div.className = "birdCard";
    div.id = bird.band;
    div.appendChild(buildSlider(bird));
    div.appendChild(buildInfo(bird));
    return div
}

function buildInfo(bird) {
    let info = document.createElement("div");
    info.className = "birdInfo";
    info.innerHTML = `<h1>${bird.band}</h1><p>Banded: ${bird.banded}</p><p>Sex: ${bird.sex}</p><p>${bird.description}</p>`;
    return info
}

function buildSlider(bird) {
    let slider = document.createElement("div");
    slider.className = "slider";
    bird.images.forEach((image, index) => {
        let a = document.createElement("a");
        a.href = `#img-${bird.band}-${index}`
        slider.appendChild(a)
    })
    let slides = document.createElement("div");
    slides.className = "slides"
    bird.images.forEach((image, index) => {
        let slide = document.createElement("div");
        slide.id = `img-${bird.band}-${index}`;
        slide.innerHTML = `<img class="bgImg" src="images/${image}"><img src="images/${image}">`;
        slides.appendChild(slide)
    })
    slider.appendChild(slides);
    return slider
}

function buildCards() {
    let container = document.getElementsByClassName("birdCards")[0]
    data.forEach(bird => {
        let div = buildCard(bird)
        container.appendChild(div)
    });
    container.lastChild.className += " active"
}

buildCards()