function PickBirdFromAudio(correct, selected) {
    InsertQuestionText("Select the name of the bird heard in the following clip") 

    var sound = Shuffle(correct.sounds)[0]
    var elem = document.createElement("audio");
    elem.setAttribute("src", sound);
    elem.setAttribute("controls", "");
    var image_container = document.getElementById("question");
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
    InsertQuestionText("Enter the name of the bird heard in the following clip.")

    var sound = Shuffle(correct.sounds)[0]
    var elem = document.createElement("audio");
    elem.setAttribute("src", sound);
    elem.setAttribute("controls", "");
    var image_container = document.getElementById("question");
    image_container.appendChild(elem);

    InsertAnswerInputBox();
    check_function = checkEnteredName
}

function PickBirdFromPicture(correct, selected) {
    InsertQuestionText("Select the name of the bird shown in the picture.")

    var elem = RenderImage(correct);
    elem.setAttribute("class", "questionImage");
    var image_container = document.getElementById("question");
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
    InsertQuestionText(`Select the image which contains a ${RenderName(correct)}`)

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
        var label = document.createElement("label");
        label.setAttribute("for", bird.name);
        selector.appendChild(input);
        label.appendChild(img);
        selector.appendChild(label);
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
    InsertQuestionText(`Pick the Māori name for a ${correct.name}`)

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
    InsertQuestionText(`Pick the English name for a ${capitalizeFirstLetter(correct.maori_name)}.`)

    var answers_container = document.getElementById("answer");
    var answers = document.createElement("ul");
    for (const bird of Shuffle(selected)) {
        var answer = document.createElement("li");
        answer.innerHTML = `<input type="radio" id="${bird.name}" name="answer" value="${bird.name}"><label for="${bird.name}">${bird.name}</label>`;
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
    InsertQuestionText(`Enter the Māori name for a ${correct.name}.`)
    InsertAnswerInputBox();

    check_function = checkEnteredMaoriName;
}

function EnterEnglishName(correct, selected) {
    InsertQuestionText(`Enter the English name for a ${correct.maori_name}.`)
    InsertAnswerInputBox();

    check_function = checkEnteredName;
}

function EnterNameFromPicture(correct, selected) {
    InsertQuestionText("Enter the name of the bird shown in the picture.")
    
    var elem = RenderImage(correct)
    elem.setAttribute("class", "questionImage");
    const image_container = document.getElementById("question");
    image_container.appendChild(elem);
    InsertAnswerInputBox();
    
    check_function = checkEnteredName;
}

function InsertQuestionText(text) {
    const image_container = document.getElementById("question");
    const q = document.createElement("p");
    q.innerHTML = text;
    image_container.appendChild(q)
}

function InsertAnswerInputBox() {
    const answers_container = document.getElementById("answer");
    const input = document.createElement("input")
    input.setAttribute("type", "text");
    input.setAttribute("id", "answer box");
    answers_container.appendChild(input);
}

function checkPickedName() {
    const answer = document.querySelector('input[name="answer"]:checked')
    const got_it_right = answer != null && answer.value == correct.name
    reveal_answer = revealBird
    return got_it_right
}

function checkPickedMaoriName() {
    const answer = document.querySelector('input[name="answer"]:checked')
    const got_it_right = answer != null && answer.value == correct.maori_name
    reveal_answer = revealBird
    return got_it_right
}

function checkPickedPicture() {
    const answer = document.querySelector('input[name="answer"]:checked')
    const got_it_right = answer != null && answer.value == correct.name
    reveal_answer = revealPicture
    return got_it_right
}

function checkEnteredName() {
    const entered = document.getElementById("answer box").value;
    const got_it_right = entered != null && correct.other_names.includes(entered.toLowerCase())
    reveal_answer = revealBird
    return got_it_right
}

function checkEnteredMaoriName() {
    const entered = document.getElementById("answer box").value;
    const got_it_right = entered != null && correct.maori_name == entered.toLowerCase()
    reveal_answer = revealBird
    return got_it_right
}


function alwaysWrong() {
    reveal_answer = revealBird
    return false
}

function revealBird(got_it_right) {
    var outcome = document.createElement("div");
    const birdName = RenderName(correct);
    const aOrAn = ('AEIOU'.includes(birdName.charAt(0).toUpperCase())) ? 'an' : 'a';
    outcome.innerHTML = `<p>${got_it_right ? 'Correct!' : 'Incorrect.'} It was ${aOrAn} <a href="https://nzbirdsonline.org.nz/${correct.link}">${birdName}</a>.</p>`

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