const formy = document.getElementById("formy")
const texty = document.getElementById("texty")
const result = document.getElementById("result-title")
const loading = document.getElementById("loading")
const main = document.getElementById("main")
const resolt = document.querySelector(".resolt");
// async function getDictionary(word) {
//     loading.style.display = "block"
//     result.style.display = "none"
//     try{
//         const response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.wordgamedictionary.com/api/v1/references/scrabble/${word}?key=7.304453775081076e29`)
//         var parser = new DOMParser();
//         var xmlDoc = parser.parseFromString(await response.text(),"text/xml");
//         var output = xmlDoc.getElementsByTagName("scrabble")[0].textContent
//         result.style.display = "block"
//         loading.style.display = "none"
//         result.innerHTML = `"${word}" is ${output == 1? "a valid":"not a valid"} word`
//     }catch(err){
//         result.style.display = "block"
//         loading.style.display = "none"
//         result.innerHTML = "Request error"
//         result.classList.add('error');
//     }
    

// }
const bored = document.querySelector('.board');

var letters = [
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

var board = [
    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','','']
]
function permutation(gen, cur, ele) {
    if(ele.length != 0){
        for (let i = 0; i < ele.length; i++) {
            const element = ele[i];
            let rem = [...ele]
            rem.splice(i, 1)
            gen = permutation(gen, cur.concat(element), rem); 
            
        }
    }
    else{
        gen.push(cur)
    }
    return gen
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

function readTextFile(file)
{   
    loading.style.display = "block";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                window.dictionary = allText.split(/\r\n|\n/);
                main.style.display = "block";
                loading.style.display = "none";
            }
        }
    }
    rawFile.send(null);
}

readTextFile("/Collins Scrabble Words (2019).txt")

formy.addEventListener('submit', function(e) {
    e.preventDefault();
    result.style.display = "block"
    result.innerHTML = `"${texty.value}" is ${window.dictionary.includes(texty.value.toUpperCase()) ? "a valid":"not a valid"} word`

});

// function recursion(newSquare, currentWord, words, firstTime) {
//     if (newSquare.x == 0 && newSquare.y == 1 ) {
//         console.log(currentWord);
//     }
//     let word = "";
//     for (let i = 0; i < currentWord.length; i++) {
//         const object = currentWord[i];
//         word += object.letter;
//     }
//     if(newSquare.x > 3  || newSquare.x < 0 || newSquare.y > 3  || newSquare.y < 0 ) {
//         if (!words.includes(word)) words.push(word);
//         return words
//     }
//     else{
//         for (let i = 0; i < currentWord.length; i++) {
//             const object = currentWord[i];
//             if(object.x == newSquare.x && object.y == newSquare.y) return words
//         }
//         word += board[newSquare.x][newSquare.y]
//         currentWord.push({
//             letter: board[newSquare.x][newSquare.y],
//             x: newSquare.x,
//             y: newSquare.y
//         })
//         if (!words.includes(word)) words.push(word);

  
//         let butt = [...currentWord];
//         words = recursion({x: newSquare.x+1, y: newSquare.y}, butt, words, false)
//         words = recursion({x: newSquare.x+1, y: newSquare.y+1}, butt, words, false)
//         words = recursion({x: newSquare.x+1, y: newSquare.y-1}, butt, words, false)

//         words = recursion({x: newSquare.x-1, y: newSquare.y}, butt, words, false)

//         words = recursion({x: newSquare.x-1, y: newSquare.y+1}, butt, words, false)

//         words = recursion({x: newSquare.x-1, y: newSquare.y-1}, butt, words, false) 
        
//         words = recursion({x: newSquare.x, y: newSquare.y+1}, butt, words, false)

//         words = recursion({x: newSquare.x, y: newSquare.y-1}, butt, words, false)
//         return words
//     }
// }
// console.log(recursion({x: 0, y: 0}, [], [], true))

var words = {
    data: []
}
   
function recursion(visited, row, column, cur,) {
    if (row < 0 || row > 3 || column < 0 || column > 3 || visited[column][row] == true) {}
    else{
        visited[column][row] = true
        cur += board[column][row]
        if(!words.data.includes(cur))words.data.push(cur)
        recursion(visited, row+1, column, cur, false)
        recursion(visited, row+1, column+1, cur, false)
        recursion(visited, row+1, column-1, cur, false)
        recursion(visited, row-1, column, cur, false)
        recursion(visited, row-1, column+1, cur, false)
        recursion(visited, row-1, column-1, cur, false)
        recursion(visited, row, column+1, cur, false)
        recursion(visited, row, column-1, cur, false)
    }
}
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        recursion(
            [
                [false,false,false,false],
                [false,false,false,false],
                [false,false,false,false],
                [false,false,false,false]
            ],
            i,j, "", true
        )
        console.log("-------------------")
    }
    
}
console.log(words.data)
const butts = words.data.filter((word) => window.dictionary.includes(word.toUpperCase()));
butts.forEach(word => resolt.innerHTML += `<li class="result-item">${word}</li>`)

