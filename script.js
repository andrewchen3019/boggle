(function() {
const formy = document.getElementById("formy")
const texty = document.getElementById("texty")
const results = document.querySelector(".results");
const loading = document.getElementById("loading")
const main = document.getElementById("main")
const resolt = document.querySelector(".resolt");
const bored = document.querySelector('.board');
const realDict = dictString.split("\n");
let intervalThingy;
const letters = [
        ['R', 'I', 'F', 'O', 'B', 'X'], 
        ['I', 'F', 'E', 'H', 'E', 'Y'], 
        ['D', 'E', 'N', 'O', 'W', 'S'], 
        ['U', 'T', 'O', 'K', 'N', 'D'], 
        ['H', 'M', 'S', 'R', 'A', 'O'], 
        ['L', 'U', 'P', 'E', 'T', 'S'], 
        ['A', 'C', 'I', 'T', 'O', 'A'], 
        ['Y', 'L', 'G', 'K', 'U', 'E'], 
        ['Qu', 'B', 'M', 'J', 'O', 'A'], 
        ['E', 'H', 'I', 'S', 'P', 'N'], 
        ['V', 'E', 'T', 'I', 'G', 'N'], 
        ['B', 'A', 'L', 'I', 'Y', 'T'], 
        ['E', 'Z', 'A', 'V', 'N', 'D'], 
        ['R', 'A', 'L', 'E', 'S', 'C'], 
        ['U', 'W', 'I', 'L', 'R', 'G'], 
        ['P', 'A', 'C', 'E', 'M', 'D']
]

let board = [
    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','','']
]

let wordList = [];

let visited = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false]
]
function inBounds(num){
  return !(num > 3 || num < 0);
}
function findWords(visited, word, x, y){
    word += board[x][y];
        word = word.toUpperCase();
    visited[x][y] = true;
    if(word.length > 2){
      if(isAWord(word)){
        if(wordList.indexOf(word) == -1){
          wordList.push(word);
        }
      }else {
      if(!doesBegin(word)){
        visited[x][y] = false;
        word = word.substring(0, word.length - 2);
        return false;
      }
      }
    }
    for(let r=-1; r <= 1; r++){
      for(let c=-1; c <= 1; c++){
        if(inBounds(x+c) && inBounds(y+r) && !(r == 0 && c == 0) && !visited[x+c][y+r]){
          findWords(visited, word, x+c, y+r);
        }
      }
    }
    visited[x][y] = false;
    word = word.substring(0, word.length - 2);
  }

function isAWord(word){
      let l = 0;
      let r = realDict.length-1;
      let m, res;
      while (l <= r){
        m = Math.floor((l+r)/2);
        res = word.localeCompare(realDict[m]);
        if(res == 0){
          return true;
        }else if(res > 0){
          l = m+1;
        }else {
          r = m-1;
        }
      }
      return false; 
    }

function doesBegin(word) {
      let l = 0;
      let r = realDict.length-1;
      let m, res;
      while (l <= r){
        m = Math.floor((l+r)/2);
        res = word.localeCompare(realDict[m].substring(0, word.length));
        if(res == 0){
          return true;
        }else if(res > 0){
          l = m+1;
        }else {
          r = m-1;
        }
      }
      return false;
    }

for (let i= 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        const ranNum = Math.floor(Math.random() *  letters.length);
        board[i][j] = letters[ranNum][Math.floor(Math.random() *  6)];
        letters.splice(ranNum, 1)
        const el = document.createElement('div');
        el.classList.add('grid');
        el.innerHTML = board[i][j];
        bored.appendChild(el);
    }
}

for(let i=0; i < 4; i++){
  for(let j=0; j < 4; j++){
    findWords(visited, "", i, j);
  }
}
let userWords = [];

formy.addEventListener('submit', function(e) {
    e.preventDefault();
    let theWord = texty.value.toUpperCase();
texty.focus();
    if(wordList.includes(theWord)){
      if(!userWords.includes(theWord)){
        texty.value = "";
              userWords.push(theWord);
      results.innerHTML += `<div class="good-word">${theWord}</div>`
      }else {
        document.querySelector(".message").innerHTML = "You already guessed this word";
        setTimeout(() => {document.querySelector(".message").innerHTML = "";}, 3000);
      }
    }else {
      
      if(isAWord(theWord)){
        document.querySelector(".message").innerHTML = "This word is not creatable";
      }else {
        document.querySelector(".message").innerHTML = "Not a word"
      }
       setTimeout(() => {document.querySelector(".message").innerHTML = "";}, 3000);
    }
});

const clock = document.querySelector(".clock");
const pointValues = document.querySelector(".points-value");
let seconds = 180;
intervalThingy = setInterval(function() {
  seconds--;
    let minutes, secundos;
    minutes = Math.floor(seconds/60);
    secundos = seconds - minutes * 60;
    clock.innerHTML = `${minutes}: ${secundos < 10 ? ("0" + secundos): secundos}`;
  if(seconds == 0){
    clearInterval(intervalThingy);
    document.querySelector(".result").style.display = "block"
    wordList.forEach(word => resolt.innerHTML += `<li class="result-item">${word}</li>`);
    formy.style.display = "none";
    clock.style.display = "none";
    let score = 0;
    userWords.forEach(word => {
      if(word.length == 3 || word.length == 4){
        score++;
      }else if(word.length == 5){
        score += 2;
      }else if(word.length == 6){
        score += 3;
      }else if(word.length == 7){
        score += 5;
      }else {
        score += 11;
      }
    }
    )
    pointValues.innerHTML = score + " points";
  }
}, 1000);



})();

