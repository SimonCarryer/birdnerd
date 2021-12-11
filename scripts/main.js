
levels = {
    "Egg": [PickBirdFromPicture, PickPictureFromBird],
    "Fledgeling": [EnterNameFromPicture, PickBirdFromPicture, PickPictureFromBird, PickOtherLanguageName],
    "Flapper": [PickBirdFromAudio, EnterNameFromPicture, PickPictureFromBird, PickOtherLanguageName],
    "Bird brain": [EnterNameFromAudio, PickBirdFromAudio, EnterNameFromPicture, EnterOtherLanguageName],
    "True bird nerd": [EnterNameFromAudio, EnterNameFromPicture, EnterOtherLanguageName]
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
    var answers_container = document.getElementById("answer");
    answers_container.innerHTML = "";
    var image_container = document.getElementById("question");
    image_container.innerHTML = "";
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
    q.innerHTML = "Select the name of the bird heard in the following clip.";
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
    var image = Shuffle(correct.images)[0]
    var image_container = document.getElementById("question");
    var q = document.createElement("p");
    q.innerHTML = "Select the name of the bird shown in the picture.";
    image_container.appendChild(q)
    var elem = document.createElement("img");
    elem.setAttribute("src", image.href);
    elem.setAttribute("alt", image.alt);
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
    elem.innerHTML = `Select the image which contains a ${correct.name}`
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answer");
    var answers = document.createElement("ul");
    for (const bird of Shuffle(selected)) {
        image = Shuffle(bird.images)[0]
        var answer = document.createElement("li");
        var img = document.createElement("img");
        img.setAttribute("src", image.href);
        img.setAttribute("alt", image.alt);
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
    var image = Shuffle(correct.images)[0]
    var image_container = document.getElementById("question");
    var q = document.createElement("p");
    q.innerHTML = "Enter the name of the bird shown in the picture.";
    image_container.appendChild(q)
    var elem = document.createElement("img");
    elem.setAttribute("src", image.href);
    elem.setAttribute("alt", image.alt);
    elem.setAttribute("class", "questionImage");
    image_container.appendChild(elem);

    var answers_container = document.getElementById("answer");
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

function checkEnteredMaoriName() {
    const entered = document.getElementById("answer box").value;
    if (entered) {
        var name = entered.toLowerCase();
        var got_it_right = correct.maori_name == entered.toLowerCase()
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
    var outcome = document.createElement("div");
    if (got_it_right) {
        outcome.innerHTML = `<p>Correct! It was a <a href="https://nzbirdsonline.org.nz/${correct.link}">${RenderName(correct)}</a>.`
    }
    else {
        outcome.innerHTML = `<p>Incorrect. It was a <a href="https://nzbirdsonline.org.nz/${correct.link}">${RenderName(correct)}</a>.`
    }

    return outcome
}

function revealPicture(got_it_right) {
    const answer = document.querySelector('input[name="answer"]:checked')
    var outcome = document.createElement("div");
    if (answer) {
        var selected = answer.value;
        if (got_it_right) {
            outcome.innerHTML = `<p>Correct! It was a <a href="https://nzbirdsonline.org.nz/${correct.link}">${RenderName(correct)}</a>.</p>`
        }
        else {
            outcome.innerHTML = `<p>Incorrect. You selected a ${selected}.</p>`
        }
    }
    else {
        outcome.innerHTML = `<p>Nothing was selected.</p>`
    }
    return outcome

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
    const question = Shuffle(questions)[0]

    if ([PickOtherLanguageName, EnterOtherLanguageName].includes(question)) {
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
    var got_it_right = check_function();
    var outcome = reveal_answer(got_it_right);
    outcome.setAttribute("class", "outcome-content");
    var outcome_container = document.getElementById("outcome");
    outcome_container.innerHTML = "";
    outcome_container.appendChild(outcome)
    if (got_it_right) {
        outcome_container.setAttribute("class", "outcome correct");
    }
    else {
        outcome_container.setAttribute("class", "outcome incorrect");
    }
    window.scrollTo(0, 0);
    AskAQuestion();
}

check_function = alwaysWrong
reveal_answer = revealBird

AskAQuestion()