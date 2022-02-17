
questionsByLevel = {
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

// Shuffle array
function Shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(rand() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
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

function RenderImage(bird) {
    var image = Shuffle(bird.images)[0]
    var elem = document.createElement("img");
    elem.setAttribute("src", image.href);
    elem.setAttribute("alt", image.alt);
    var img = document.createElement("div")
    img.appendChild(elem)
    var credit = document.createElement("div");
    credit.setAttribute("class", "imageCredit");
    credit.innerHTML = `©${image.copyright}`;
    img.appendChild(credit);
    return img
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
    const question = Shuffle(questionsByLevel[level])[0]
    if ([PickOtherLanguageName, EnterOtherLanguageName].includes(question)) {
        var birds = []
        for (const bird of data) {
            if (bird.category.includes(category) & bird.hasOwnProperty("maori_name") & !usedBirds.includes(bird)) {
                birds.push(bird)
            }
        }
        var selected = Shuffle(birds).slice(0, 5);
        var correct = selected[0];
        usedBirds.push(correct);
    }
    else {
        var birds = []
        for (const bird of data) {
            if (bird.category.includes(category) & !usedBirds.includes(bird)) {
                birds.push(bird)
            }
        }
        var selected = Shuffle(birds).slice(0, 5);
        var correct = selected[0];
        usedBirds.push(correct);
    }
    return [question, correct, selected]
}


function AskAQuestion() {
    ClearOptions()
    if (numberOfQuestions >= totalQuestions) {
        restartGame()
    }
    var final = document.getElementById("question");
    final.innerHTML = `<b>Question ${numberOfQuestions + 1} of ${totalQuestions}</b>`
    elements = questions[numberOfQuestions]
    question = elements[0];
    correct = elements[1];
    selected = elements[2];
    question(correct, selected);

    const button = document.getElementById("action");
    button.onclick = checkAnswer;
    button.innerText = (numberOfQuestions === totalQuestions - 1) ? "Finish" : "Submit";
}

function checkAnswer() {
    var got_it_right = check_function();

    // Show the results box
    var outcomeElement = reveal_answer(got_it_right);
    outcomeElement.setAttribute("class", "outcome-content");
    const outcome_container = document.getElementById('result-container');
    outcome_container.innerHTML = "";
    outcome_container.appendChild(outcomeElement);
    outcome_container.style.visibility = 'visible';

    if (got_it_right) {
        outcome_container.setAttribute("class", "outcome correct");
        correctCount++;
    } else {
        outcome_container.setAttribute("class", "outcome incorrect");
        const correctAnswer = document.getElementById(correct.name);
        if (correctAnswer) {
            correctAnswer.parentElement.className += 'correct_answer'
        }
    }

    numberOfQuestions++
    if (numberOfQuestions === totalQuestions) {
        endGame()
    }
    else {
        const nextQuestionButton = document.getElementById('action');
        nextQuestionButton.textContent = 'Next';
        nextQuestionButton.onclick = proceedToNextQuestion;
    }
}

function proceedToNextQuestion() {
    // Remove the previous answer content
    document.getElementById('result-container').innerHTML = ""

    window.scrollTo(0, 0);
    AskAQuestion();
}

monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function restartGame() {
    var today = new Date();
    var dateText = `${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
    var dateInt = parseInt(`${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`);
    let header = document.getElementById("title");
    header.innerHTML = `Daily Birdle for ${dateText}`
    rand = mulberry32(dateInt)
    totalQuestions = 10;
    numberOfQuestions = 0;
    correctCount = 0;
    usedBirds = [];
    questions = [];
    const categories = Shuffle(["Forest (native or plantation)",
        "Forest (native or plantation)",
        "At sea (or dead on a beach)",
        "Coastal",
        "Lake, river or wetland",
        "Urban park or garden",
        "Urban park or garden",
        "Urban park or garden",
        "Mountain",
        "Harbour, estuary or rivermouth",
        "Harbour, estuary or rivermouth",
        "Farmland or horticultural block",
        "Farmland or horticultural block"])
    const levels = ["Egg", "Egg", "Egg", "Fledgeling", "Fledgeling", "Fledgeling", "Flapper", "Flapper", "Flapper", "Bird brain", "True bird nerd", "True bird nerd"]
    for (let i = 0; i < totalQuestions; i++) {
        questions.push(BuildQuestion(levels[i], categories[i]))
    }
    document.getElementById("result-container").innerHTML = "";
    AskAQuestion()
}

function endGame() {
    ClearOptions()
    var final = document.getElementById("final");
    let bird = Shuffle(usedBirds)[0]
    let img = RenderImage(bird)
    img.setAttribute("class", "finalImage");
    final.appendChild(img);
    let title = document.createElement("div");
    title.setAttribute("class", "finalAttribution")
    title.innerHTML = img.firstChild.getAttribute("alt");
    final.appendChild(title);
    let finalScore = document.createElement("h2");
    finalScore.innerHTML = `Your score: ${correctCount} out of ${totalQuestions} `
    final.appendChild(finalScore);
    let button = document.getElementById("action");
    button.remove();

    endGameUpdateStats(correctCount);
}

check_function = alwaysWrong
reveal_answer = revealBird

restartGame()