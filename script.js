/*****  Variables  *****/


const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let missed = 0;


const startButton = document.querySelector("a.btn__reset");
const ul = document.querySelector('#phrase ul');
const buttons = document.querySelectorAll('button');
let orderedList = document.querySelector('ol');
let triesList = document.querySelectorAll('.tries')
const scoreBoard = document.getElementById('scoreboard');
const hearts = scoreBoard.getElementsByTagName('img');



// Phrases

let phrases = ['Good Luck' , 'Try again' , 'Happy Coding' , 'All the Best' , 'Good Job'];



// Button clicked

startButton.addEventListener('click', () => {
  document.getElementById('overlay').style.display = 'none';

});

const getRandomPhraseAsArray = arr => {
  const randomPhrase = arr[Math.floor(Math.random() * phrases.length)];
  const words = randomPhrase.split(''); 
  return words;
};

const phraseArray = getRandomPhraseAsArray(phrases);


const addPhraseToDisplay = arr => {
  for (let i = 0; i < arr.length; i++){
  const listElement = document.createElement('li');
  listElement.textContent = arr[i];

  if (arr[i] !== ' '){
    listElement.className = 'letter'
  } else {
    listElement.className = 'space';
  }
  ul.appendChild(listElement);
  }
}

addPhraseToDisplay(phraseArray);


function checkLetter(button){
  let letterElements = phrase.querySelectorAll('.letter');
  let matchingLetter = null;
  for (let i = 0; i < letterElements.length; i++){
    if(letterElements[i].textContent.toLowerCase() == button.textContent){
      letterElements[i].classList.add('show');
      matchingLetter = letterElements[i].textContent;
    } 
  }
  if (matchingLetter != null){
    return matchingLetter;
  } else {
    return null;
  }
  
}


qwerty.addEventListener('click', (event)=> {
  if(event.target.tagName == 'BUTTON'){
    event.target.className += 'chosen'; 
    event.target.setAttribute('disabled', 'true'); 
    let letterFound = checkLetter(event.target);
    if (letterFound === null){
      missed++;
      hearts[missed - 1].src = 'images/lostHeart.png'
    }
    checkWin();
  } 
})

const resetGame = () => {
  missed = 0;
  let chosenElements = qwerty.querySelectorAll('.chosen');
  while(ul.firstChild){
    ul.removeChild(ul.firstChild);
  };
  const newPhaseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(newPhaseArray);
  for (let i = 0; i < triesList.length; i++){
    hearts[i].src = 'images/liveHeart.png'
  }
  for(let i = 0; i < chosenElements.length; i++){
    chosenElements[i].classList.remove('chosen');
    chosenElements[i].removeAttribute('disabled');
  }
  document.getElementById('phrase').style.display = 'block';
}

const checkWin = () => {
  let letterElements = phrase.querySelectorAll('.letter');
  let showElement = document.querySelectorAll('.show');
  if (letterElements.length == showElement.length){
    document.getElementById('overlay').className = 'win';
    document.getElementById('overlay').style.display = 'flex';
    let title = document.querySelector('h2');
    document.getElementById('phrase').style.display = 'none';
    title.textContent = 'Wow! You won! Congratulations';
    resetGame();
  } else if (missed > 4){
    document.getElementById('overlay').classList.add('lose');
    document.getElementById('overlay').style.display = 'flex';
    let title = document.querySelector('h2');
    document.getElementById('phrase').style.display = 'none';
    title.textContent = 'Sorry! You lost, Try again!';
    resetGame()
  }
}
