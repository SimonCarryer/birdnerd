
levels = {
    "Egg": [PickBirdFromPicture, PickPictureFromBird],
    "Fledgeling": [EnterNameFromPicture, PickBirdFromPicture, PickPictureFromBird, PickOtherLanguageName],
    "Flapper": [PickBirdFromAudio, EnterNameFromPicture, PickPictureFromBird, PickOtherLanguageName],
    "Bird brain": [EnterNameFromAudio, PickBirdFromAudio, EnterNameFromPicture, EnterOtherLanguageName],
    "True bird nerd": [EnterNameFromAudio, EnterNameFromPicture, EnterOtherLanguageName]
}

function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

rand = mulberry32(0)

// Shuffle array
function Shuffle(array) {
    const shuffled = array.sort(() => 0.5 - rand());
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
    var final = document.getElementById("final");
    final.innerHTML = "";
}

function BuildQuestion(level, category) {
    const question = Shuffle(levels[level])[0]
    if ([PickOtherLanguageName, EnterOtherLanguageName].includes(question)) {
        birds = []
        for (const bird of data) {
            if (bird.category.includes(category) & bird.hasOwnProperty("maori_name") & !usedBirds.includes(bird)) {
                birds.push(bird)
            }
        }
        var selected = Shuffle(birds).slice(0, 5);
        var correct = selected[0];
    }
    else {
        birds = []
        for (const bird of data) {
            if (bird.category.includes(category) & !usedBirds.includes(bird)) {
                birds.push(bird)
            }
        }
        var selected = Shuffle(birds).slice(0, 5);
        var correct = selected[0];
    }
    return [question, correct, selected]
}


function AskAQuestion() {
    ClearOptions()
    elements = questions[numberOfQuestions]
    question = elements[0];
    correct = elements[1];
    selected = elements[2];
    question(correct, selected);
    if (numberOfQuestions == totalQuestions - 1) {
        let button = document.getElementById("action");
        button.innerHTML = "Finish"
    }
    else if (numberOfQuestions > totalQuestions) {
        restartGame()
    }
    else {
        let button = document.getElementById("action");
        button.innerHTML = "Next"
    }
}

function checkAnswer() {
    numberOfQuestions += 1
    var got_it_right = check_function();
    var outcome = reveal_answer(got_it_right);
    outcome.setAttribute("class", "outcome-content");
    var outcome_container = document.getElementById("outcome");
    outcome_container.innerHTML = "";
    outcome_container.appendChild(outcome)
    if (got_it_right) {
        outcome_container.setAttribute("class", "outcome correct");
        correctCount += 1;
    }
    else {
        outcome_container.setAttribute("class", "outcome incorrect");
    }
    if (numberOfQuestions == totalQuestions) {
        endGame()
    }
    else {
        let counter = document.createElement("div");
        counter.innerHTML = `Your score: ${correctCount}, ${totalQuestions - numberOfQuestions} questions remaining.`;
        outcome.appendChild(counter);
        window.scrollTo(0, 0);
        AskAQuestion();
    }
}

function restartGame() {
    totalQuestions = 10;
    numberOfQuestions = 0;
    correctCount = 0;
    usedBirds = [];
    questions = [];
    category = document.getElementById("categories").value;
    level = document.getElementById("levels").value;
    for (let i = 0; i <= totalQuestions; i++) {
        questions.push(BuildQuestion(level, category))
    }
    var outcome_container = document.getElementById("outcome");
    outcome_container.innerHTML = "";
    AskAQuestion()
}

function endGame() {
    ClearOptions()
    var final = document.getElementById("final");
    let finalScore = document.createElement("h2");
    finalScore.innerHTML = `Your score: ${correctCount} out of ${totalQuestions}`
    let cats = document.createElement("p");
    cats.innerHTML = `Category: ${category}<br>Level: ${level}`;
    final.appendChild(finalScore);
    let imageBox = document.createElement("div");
    imageBox.setAttribute("class", "finalImageBox")
    for (const bird of usedBirds) {
        let image = Shuffle(bird.images)[0];
        let elem = document.createElement("img");
        elem.setAttribute("src", image.href);
        elem.setAttribute("src", image.href);
        elem.setAttribute("class", "finalImage");
        imageBox.appendChild(elem);
    }
    final.appendChild(imageBox);
    final.appendChild(cats);
    let button = document.getElementById("action");
    button.innerHTML = "Try again"
}


var categories = document.getElementById("categories");

categories.addEventListener("change", function () {
    restartGame()
});

var l = document.getElementById("levels");

l.addEventListener("change", function () {
    restartGame()
});

check_function = alwaysWrong
reveal_answer = revealBird

restartGame()