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
    answers_container.appendChild(input)
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
    answers_container.appendChild(input)
}


function AskAQuestion() {
    const category = document.getElementById("categories").value;
    const level = document.getElementById("levels").value;
    ClearOptions()
    birds = []
    for (const bird of data) {
        if (bird.category.includes(category)) {
            birds.push(bird)
        }
    }
    // Get sub-array of first n elements after shuffled
    let selected = Shuffle(birds).slice(0, 5);
    correct = selected[0];
    const questions = levels[level]
    const question = Shuffle(questions)[0]
    question(correct, selected)

}

function checkAnswer() {
    const answer = document.querySelector('input[name="answer"]:checked')
    if (answer) {
        const selected = answer.value;
        got_it_right = selected == correct.name
    }
    else {
        const entered = document.getElementById("answer box").value.toLowerCase();
        got_it_right = correct.other_names.includes(entered) | correct.name.toLowerCase() == entered
    }

    var outcome_container = document.getElementById("outcome container");
    if (got_it_right) {
        outcome_container.innerHTML = `<h2>Correct!</h2><p>It was a ${RenderName(correct)}</p><a href="https://nzbirdsonline.org.nz/${correct.link}">More about this bird</a>`
    }
    else {
        outcome_container.innerHTML = `<h2>Incorrect</h2><p>It was a ${RenderName(correct)}</p><a href="https://nzbirdsonline.org.nz/${correct.link}">More about this bird</a>`
    }
    AskAQuestion();
}

function StartGame() {
    score = 0
    asked = 0
    score_p = document.getElementById("score");
    score.innerHTML = `Your score: ${score}/${asked}`
}


AskAQuestion()