
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
    var final = document.getElementById("final");
    final.innerHTML = "";
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
    ClearOptions()
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
    else {
        // Get sub-array of first n elements after shuffled
        selected = Shuffle(birds).slice(0, 5);
        correct = selected[0];
    }
    usedBirds.push(correct)
    question(correct, selected)
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
    category = document.getElementById("categories").value;
    level = document.getElementById("levels").value;
    var outcome_container = document.getElementById("outcome");
    outcome_container.innerHTML = "";

    birds = []
    for (const bird of data) {
        if (bird.category.includes(category)) {
            birds.push(bird)
        }
    }
    questions = levels[level]
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