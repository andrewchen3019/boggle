const formy = document.getElementById("formy")
const texty = document.getElementById("texty")
const result = document.getElementById("result-title")
const loading = document.getElementById("loading")
const main = document.getElementById("main")
const resolt = document.querySelector(".resolt");
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
    }
    
}
console.log(words.data)
const results = words.data.filter((word) => window.dictionary.includes(word.toUpperCase()));
results.forEach(word => resolt.innerHTML += `<li class="result-item">${word}</li>`)

