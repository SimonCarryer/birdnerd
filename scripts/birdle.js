levels = {
    "Egg": [PickBirdFromPicture, PickPictureFromBird],
    "Fledgeling": [EnterNameFromPicture, PickBirdFromPicture, PickPictureFromBird, PickOtherLanguageName],
    "Flapper": [PickBirdFromAudio, EnterNameFromPicture, PickPictureFromBird, PickOtherLanguageName],
    "Bird brain": [EnterNameFromAudio, PickBirdFromAudio, EnterNameFromPicture, EnterOtherLanguageName],
    "True bird nerd": [EnterNameFromAudio, EnterNameFromPicture, EnterOtherLanguageName]
}

usedBirds = []

function BuildQuestions() {
    const categories = ["Urban park or garden", "Urban park or garden", "Harbour, estuary or rivermouth"]
    const levels = ["Egg", "Fledgeling", "Flapper"]
    var questions = []
    for (let i = 0; i <= 2; i++) {
        questions.push(BuildQuestion(levels[i], categories[i]))
    }
    return questions
}

