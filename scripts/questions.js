
function RenderImage(bird) {
    var image = Shuffle(bird.images)[0]
    var elem = document.createElement("img");
    elem.setAttribute("src", image.href);
    elem.setAttribute("alt", image.alt);
    elem.setAttribute("title", image.alt);
    var link = document.createElement("a")
    link.setAttribute("href", `http://nzbirdsonline.org.nz${bird.link}`)
    link.appendChild(elem)
    return link
}

function PickBirdFromAudio(correct, selected) {
    var sound = Shuffle(correct.sounds)[0]
    var image_container = document.getElementById("question");
    var q = document.createElement("p");
    q.innerHTML = "Select the name of the bird heard in the following clip";
    image_container.appendChild(q)
    var elem = document.createElement("audio");
    elem.setAttribute("src", sound);
    elem.setAttribute("controls", "");
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answer");
    var answers = document.createElement("ul");
    for (const bird of Shuffle(selected)) {
        var answer = document.createElement("li");
        answer.innerHTML = `<input type="radio" id="${bird.name}" name="answer" value="${bird.name}"><label for="${bird.name}">${RenderName(bird)}</label>`;
        answers.appendChild(answer);
    }
    answers_container.appendChild(answers);
    check_function = checkPickedName
}


function EnterNameFromAudio(correct, selected) {
    var sound = Shuffle(correct.sounds)[0]
    var image_container = document.getElementById("question");
    var q = document.createElement("p");
    q.innerHTML = "Enter the name of the bird heard in the following clip.";
    image_container.appendChild(q)
    var elem = document.createElement("audio");
    elem.setAttribute("src", sound);
    elem.setAttribute("controls", "");
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answer");
    input = document.createElement("input")
    input.setAttribute("type", "text");
    input.setAttribute("id", "answer box");
    answers_container.appendChild(input);
    check_function = checkEnteredName
}

function PickBirdFromPicture(correct, selected) {
    var image_container = document.getElementById("question");
    var q = document.createElement("p");
    q.innerHTML = "Select the name of the bird shown in the picture.";
    image_container.appendChild(q)
    var elem = RenderImage(correct);
    elem.setAttribute("class", "questionImage");
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answer");
    var answers = document.createElement("ul");
    for (const bird of Shuffle(selected)) {
        var answer = document.createElement("li");
        answer.innerHTML = `<input type="radio" id="${bird.name}" name="answer" value="${bird.name}"><label for="${bird.name}">${RenderName(bird)}</label>`;
        answers.appendChild(answer);
    }
    answers_container.appendChild(answers);
    check_function = checkPickedName
}

function PickPictureFromBird(correct, selected) {
    var image_container = document.getElementById("question");
    var elem = document.createElement("p");
    elem.innerHTML = `Select the image which contains a ${RenderName(correct)}`
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answer");
    var answers = document.createElement("ul");
    for (const bird of Shuffle(selected)) {
        var answer = document.createElement("li");
        var img = RenderImage(bird)
        img.setAttribute("class", "answerImage");
        var selector = document.createElement("div");
        var input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("id", bird.name);
        input.setAttribute("name", "answer");
        input.setAttribute("value", bird.name);
        selector.appendChild(input);
        selector.appendChild(img);
        answer.appendChild(selector);
        answers.appendChild(answer);
    }
    answers_container.appendChild(answers);
    check_function = checkPickedPicture

}

function PickOtherLanguageName(correct, selected) {
    const fn = Shuffle([PickMaoriName, PickEnglishName])[0];
    fn(correct, selected)
}

function PickMaoriName(correct, selected) {
    var image_container = document.getElementById("question");
    var q = document.createElement("p");
    q.innerHTML = `Pick the Māori name for a ${correct.name}`;
    image_container.appendChild(q)

    var answers_container = document.getElementById("answer");
    var answers = document.createElement("ul");
    for (const bird of Shuffle(selected)) {
        var answer = document.createElement("li");
        answer.innerHTML = `<input type="radio" id="${bird.maori_name}" name="answer" value="${bird.maori_name}"><label for="${bird.maori_name}">${capitalizeFirstLetter(bird.maori_name)}</label>`;
        answers.appendChild(answer);
    }
    answers_container.appendChild(answers);

    check_function = checkPickedMaoriName
}

function PickEnglishName(correct, selected) {
    var image_container = document.getElementById("question");
    var q = document.createElement("p");
    q.innerHTML = `Pick the English name for a ${capitalizeFirstLetter(correct.maori_name)}.`;
    image_container.appendChild(q)

    var answers_container = document.getElementById("answer");
    var answers = document.createElement("ul");
    for (const bird of Shuffle(selected)) {
        var answer = document.createElement("li");
        answer.innerHTML = `<input type="radio" id="${bird.name}" name="answer" value="${bird.name}"><label for="${capitalizeFirstLetter(bird.maori_name)}">${bird.name}</label>`;
        answers.appendChild(answer);
    }
    answers_container.appendChild(answers);

    check_function = checkPickedName
}

function EnterOtherLanguageName(correct, selected) {
    const fn = Shuffle([EnterMaoriName, EnterEnglishName])[0];
    fn(correct, selected)
}

function EnterMaoriName(correct, selected) {
    var image_container = document.getElementById("question");
    var q = document.createElement("p");
    q.innerHTML = `Enter the Māori name for a ${correct.name}.`;
    image_container.appendChild(q)

    var answers_container = document.getElementById("answer");
    input = document.createElement("input")
    input.setAttribute("type", "text");
    input.setAttribute("id", "answer box");
    answers_container.appendChild(input);

    check_function = checkEnteredMaoriName;
}

function EnterEnglishName(correct, selected) {
    var image_container = document.getElementById("question");
    var q = document.createElement("p");
    q.innerHTML = `Enter the English name for a ${correct.maori_name}.`;
    image_container.appendChild(q)

    var answers_container = document.getElementById("answer");
    input = document.createElement("input")
    input.setAttribute("type", "text");
    input.setAttribute("id", "answer box");
    answers_container.appendChild(input);

    check_function = checkEnteredName;
}

function EnterNameFromPicture(correct, selected) {
    var image_container = document.getElementById("question");
    var q = document.createElement("p");
    q.innerHTML = "Enter the name of the bird shown in the picture.";
    image_container.appendChild(q)
    var elem = RenderImage(correct)
    elem.setAttribute("class", "questionImage");
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answer");
    input = document.createElement("input")
    input.setAttribute("type", "text");
    input.setAttribute("id", "answer box");
    answers_container.appendChild(input);
    check_function = checkEnteredName;
}