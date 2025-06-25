const guessedLetters = document.querySelector(".guessed-letters");
// console.log(guessedLetters.outerHTML)
const guess = document.querySelector(".guess");
// console.log(guess.outerHTML)
const input = document.querySelector(".letter");
// console.log(input.outerHTML)
const wordInProgress = document.querySelector(".word-in-progress");
// console.log(wordInProgress.outerHTML)
const remaining = document.querySelector(".remaining");
// console.log(remaining.outerHTML)
const remainingGuesses = document.querySelector(".remaining span");
// console.log(remainingGuesses.outerHTML)
const message = document.querySelector(".message");
// console.log(message.outerHTML)
const playAgainBtn = document.querySelector(".play-again");
// console.log(playAgainBtn);

const word = "magnolia";

const updateWordInProgress = function () {
    const placeholders = [];
    for (const character of word) {
        console.log(character);
        placeholders.push("●");
    }
    wordInProgress.innerText = placeholders.join("");
}

updateWordInProgress(word);

guess.onclick = function (e) {
    e.preventDefault();
    let inputChar = input.value;
    console.log(inputChar)
    input.value = "";
}
