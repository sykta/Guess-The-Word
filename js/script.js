const guessedLettersElement = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuessCount = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainBtn = document.querySelector(".play-again");


let word = "magnolia"; // Starting word to test the game
let guessedLetters = [];
let remainingGuesses = 8; // Max # of guesses allowed


// Function to fetch data & random word
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"); // Fetches data from a text file
    const words = await res.text();
    // console.log(words);
    const wordArray = words.split("\n");
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    updateWordInProgress(word);
}
getWord();


// Display circle symbol as placeholder for the chosen word's letters
const updateWordInProgress = function () {
    const placeholders = [];
    for (const character of word) {
        // console.log(character);
        placeholders.push("●");
    }
    wordInProgress.innerText = placeholders.join(""); //  Joins back to a string becoming the inner text of the “word-in-progress” element 
};
updateWordInProgress(word);


// "Guess" button click function
guessBtn.onclick = function (e) {
    e.preventDefault(); // Prevents behavior of clicking a button, form submitting, and then reloading the page 
    message.innerText = ""; // Empties the text of "message" element

    // Call check input function
    let inputChar = input.value; // Captures value of input
    // console.log(inputChar)
    const inputCheckCall = validate(inputChar);
    // console.log(inputCheckCall); 

    if (inputCheckCall) {
        makeGuess(inputChar);
    }

    input.value = ""; //  Empties the value of the input
};


// Function to check input
const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/; // Regular expression to ensure letter input type
    // inputValue = ;
    if (input.length === 0) {
        // Empty input?
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        // Input character > 1?
        message.innerText = "Please enter a single letter";
    } else if (!input.match(acceptedLetter)) {
        // Input character not within defined range?
        message.innerText = "Please enter a letter between A-Z";
    } else {
        // Correct input state
        return input;
    }
};


// Function to capture input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try another!"
    } else {
        guessCount(guess);
        guessedLetters.push(guess);
        // console.log(guessedLetters)
        showGuess();
    }
    correctWordInProgress(guessedLetters);
};


// Function to display guessed letter
const showGuess = function () {
    guessedLettersElement.innerHTML = ""; // Clears existing items from ".guessed-letters" ul element
    for (let i = 0; i < guessedLetters.length; i++) {
        let li = document.createElement("li"); // Creates a list item element
        li.textContent = guessedLetters[i]; // Sets list item's text content to the array element's value
        guessedLettersElement.append(li); // Appends the new list item to unordered list
    }
}


//Function to update the word in progress when guessed correctly; replaces circle symbol
const correctWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedLetters = [];
    for (const character of wordArray) {
        if (guessedLetters.includes(character)) {
            updatedLetters.push(character);
        } else {
            updatedLetters.push("●");
        }
    }
    wordInProgress.innerText = updatedLetters.join("");
    checkWin();
};


// Function to count guesses remaining
const guessCount = function (guess) {
    guess = guess.toUpperCase();
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    if (!wordArray.includes(guess)) {
        message.innerText = "Uh oh! No bueno :("
        remainingGuesses--;
    } else {
        message.innerText = "Good guess! :D"
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game Over. The correct word is <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessCount.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessCount.innerText = `${remainingGuesses} guesses`;
    }
};


// Function to check correct word and win game!
const checkWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win"); // Adds "win" class to ".message" element
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>'; // updates paragraph contents
        startOver();
    }

};


// Function to hide/show elements
function startOver() {
    guessBtn.style.display = "none";
    remaining.style.display = "none";
    guessedLettersElement.style.display = "none";
    playAgainBtn.style.display = "block";
};


// "Play Again" click function
playAgainBtn.onclick = function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerText = "";
    remainingGuesses = 8;
    remainingGuessCount.innerText = `${remainingGuesses} guesses`;
    guessedLetters = [];
    guessBtn.style.display = "block";
    remaining.style.display = "block";
    guessedLettersElement.style.display = "block";
    playAgainBtn.style.display = "none";
    getWord();
};