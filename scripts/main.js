
levels = {
    "Egg": [PickBirdFromPicture, PickPictureFromBird],
    "Fledgeling": [EnterNameFromPicture, PickBirdFromPicture, PickPictureFromBird],
    "Flapper": [PickBirdFromAudio, EnterNameFromPicture, PickPictureFromBird],
    "Bird brain": [EnterNameFromAudio, PickBirdFromAudio, EnterNameFromPicture],
    "True bird nerd": [EnterNameFromAudio, EnterNameFromPicture]
}

// Shuffle array
function Shuffle(array) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function RenderName(bird) {
    if (bird.hasOwnProperty('maori_name')) {
        return `${bird.name}/${capitalizeFirstLetter(bird.maori_name)}`
    }
    else {
        return bird.name
    }
}

function ClearOptions() {
    var answers_container = document.getElementById("answers");
    answers_container.innerHTML = "";
    var image_container = document.getElementById("main image");
    image_container.innerHTML = "";
}


function PickBirdFromAudio(correct, selected) {
    var sound = Shuffle(correct.sounds)[0]
    var image_container = document.getElementById("main image");
    var q = document.createElement("p");
    q.innerHTML = "Select the name of the bird heard in the following clip";
    image_container.appendChild(q)
    var elem = document.createElement("audio");
    elem.setAttribute("src", sound);
    elem.setAttribute("controls", "");
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answers");
    var answers = document.createElement("ol");
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
    var image_container = document.getElementById("main image");
    var q = document.createElement("p");
    q.innerHTML = "Select the name of the bird heard in the following clip";
    image_container.appendChild(q)
    var elem = document.createElement("audio");
    elem.setAttribute("src", sound);
    elem.setAttribute("controls", "");
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answers");
    input = document.createElement("input")
    input.setAttribute("type", "text");
    input.setAttribute("id", "answer box");
    answers_container.appendChild(input);
    check_function = checkEnteredName
}

function PickBirdFromPicture(correct, selected) {
    var image = Shuffle(correct.images)[0]
    var image_container = document.getElementById("main image");
    var q = document.createElement("p");
    q.innerHTML = "Select the name of the bird shown in the picture";
    image_container.appendChild(q)
    var elem = document.createElement("img");
    elem.setAttribute("src", image.href);
    elem.setAttribute("alt", image.alt);
    elem.setAttribute("height", "200");
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answers");
    var answers = document.createElement("ol");
    for (const bird of Shuffle(selected)) {
        var answer = document.createElement("li");
        answer.innerHTML = `<input type="radio" id="${bird.name}" name="answer" value="${bird.name}"><label for="${bird.name}">${RenderName(bird)}</label>`;
        answers.appendChild(answer);
    }
    answers_container.appendChild(answers);
    check_function = checkPickedName
}

function PickPictureFromBird(correct, selected) {
    var image_container = document.getElementById("main image");
    var elem = document.createElement("p");
    elem.innerHTML = `Select the image which contains a ${correct.name}`
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answers");
    var answers = document.createElement("ol");
    for (const bird of Shuffle(selected)) {
        image = Shuffle(bird.images)[0]
        var answer = document.createElement("li");
        var img = document.createElement("img");
        img.setAttribute("src", image.href);
        img.setAttribute("alt", image.alt);
        img.setAttribute("height", "100");
        answer.appendChild(img);
        var selector = document.createElement("p");
        selector.innerHTML = `<input type="radio" id="${bird.name}" name="answer" value="${bird.name}"><label for="${bird.name}">Select</label>`;
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
    var image_container = document.getElementById("main image");
    var q = document.createElement("p");
    q.innerHTML = `Pick the Māori name for a ${correct.name}`;
    image_container.appendChild(q)

    var answers_container = document.getElementById("answers");
    var answers = document.createElement("ol");
    for (const bird of Shuffle(selected)) {
        var answer = document.createElement("li");
        answer.innerHTML = `<input type="radio" id="${bird.maori_name}" name="answer" value="${bird.maori_name}"><label for="${bird.maori_name}">${bird.maori_name}</label>`;
        answers.appendChild(answer);
    }
    answers_container.appendChild(answers);

    check_function = checkPickedMaoriName
}

function PickEnglishName(correct, selected) {
    var image_container = document.getElementById("main image");
    var q = document.createElement("p");
    q.innerHTML = `Pick the English name for a ${correct.maori_name}`;
    image_container.appendChild(q)

    var answers_container = document.getElementById("answers");
    var answers = document.createElement("ol");
    for (const bird of Shuffle(selected)) {
        var answer = document.createElement("li");
        answer.innerHTML = `<input type="radio" id="${bird.name}" name="answer" value="${bird.name}"><label for="${bird.name}">${bird.name}</label>`;
        answers.appendChild(answer);
    }
    answers_container.appendChild(answers);

    check_function = checkPickedName
}

function EnterNameFromPicture(correct, selected) {
    var image = Shuffle(correct.images)[0]
    var image_container = document.getElementById("main image");
    var q = document.createElement("p");
    q.innerHTML = "Enter the name of the bird shown in the picture";
    image_container.appendChild(q)
    var elem = document.createElement("img");
    elem.setAttribute("src", image.href);
    elem.setAttribute("alt", image.alt);
    elem.setAttribute("height", "200");
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answers");
    input = document.createElement("input")
    input.setAttribute("type", "text");
    input.setAttribute("id", "answer box");
    answers_container.appendChild(input);
    check_function = checkEnteredName;
}


function checkPickedName() {
    const answer = document.querySelector('input[name="answer"]:checked')
    if (answer) {
        const selected = answer.value;
        var got_it_right = selected == correct.name
    }
    else {
        var got_it_right = false
    }
    reveal_answer = revealBird
    return got_it_right
}

function checkPickedMaoriName() {
    const answer = document.querySelector('input[name="answer"]:checked')
    if (answer) {
        const selected = answer.value;
        var got_it_right = selected == correct.maori_name
    }
    else {
        var got_it_right = false
    }
    reveal_answer = revealBird
    return got_it_right
}

function checkPickedPicture() {
    const answer = document.querySelector('input[name="answer"]:checked')
    if (answer) {
        const selected = answer.value;
        var got_it_right = selected == correct.name
    }
    else {
        var got_it_right = false
    }
    reveal_answer = revealPicture
    return got_it_right
}

function checkEnteredName() {
    const entered = document.getElementById("answer box").value;
    if (entered) {
        var name = entered.toLowerCase();
        var got_it_right = correct.other_names.includes(name)
    }
    else {
        var got_it_right = false
    }
    reveal_answer = revealBird
    return got_it_right
}


function alwaysWrong() {
    reveal_answer = revealBird
    return false
}

function revealBird(got_it_right) {
    var outcome_container = document.getElementById("outcome container");
    if (got_it_right) {
        outcome_container.innerHTML = `<h2>Correct!</h2><p>It was a ${RenderName(correct)}</p><a href="https://nzbirdsonline.org.nz/${correct.link}">More about this bird</a>`
    }
    else {
        outcome_container.innerHTML = `<h2>Incorrect</h2><p>It was a ${RenderName(correct)}</p><a href="https://nzbirdsonline.org.nz/${correct.link}">More about this bird</a>`
    }
}

function revealPicture(got_it_right) {
    console.log("doing the thing")
    const answer = document.querySelector('input[name="answer"]:checked')
    var outcome_container = document.getElementById("outcome container");
    if (answer) {
        var selected = answer.value;
        if (got_it_right) {
            outcome_container.innerHTML = `<h2>Correct!</h2><p>It was a ${RenderName(correct)}</p><a href="https://nzbirdsonline.org.nz/${correct.link}">More about this bird</a>`
        }
        else {
            outcome_container.innerHTML = `<h2>Incorrect</h2><p>You selected a ${selected}</p>`
        }
    }
    else {
        outcome_container.innerHTML = `<p>Nothing was selected</p>`
    }

}


function AskAQuestion() {
    category = document.getElementById("categories").value;
    const level = document.getElementById("levels").value;
    ClearOptions()
    birds = []
    for (const bird of data) {
        if (bird.category.includes(category)) {
            birds.push(bird)
        }
    }

    const questions = levels[level]
    const question = PickOtherLanguageName //Shuffle(questions)[0]

    if (question == PickOtherLanguageName) {
        birds = []
        for (const bird of data) {
            if (bird.category.includes(category) & bird.hasOwnProperty("maori_name")) {
                birds.push(bird)
            }
        }
        // Get sub-array of first n elements after shuffled
        selected = Shuffle(birds).slice(0, 5);
        correct = selected[0];
    }
    // Get sub-array of first n elements after shuffled
    selected = Shuffle(birds).slice(0, 5);
    correct = selected[0];
    question(correct, selected)

}

function checkAnswer() {
    var got_it_right = check_function()
    reveal_answer(got_it_right)

    AskAQuestion();
}

check_function = alwaysWrong
reveal_answer = revealBird

AskAQuestion()