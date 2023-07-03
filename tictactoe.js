const container = document.querySelector('#container');
const grid = document.createElement('div');


//initialize the global variables 
move = 'x';
pos = 0;
let arr = Array(9).fill(null);
//function for the next move
let next = (move) => {
  if (move == 'x')
    return move= 'o';
  else
    return move= 'x';
};


//function  to find the winner
const winner = () => {
  for (let i = 0; i < 3; i++) {
    if ((arr[i] === arr[i + 3]) && (arr[i + 3] === arr[i + 6]) && (arr[i + 6] !== null)) {
      return true;
    }
  }
  for (let i = 0; i < 3; i++) {
    if (arr[i * 3] === arr[i * 3 + 1] && arr[i * 3 + 1] === arr[i * 3 + 2] && arr[i * 3 + 2] !== null) {
      return true;
    }
  }
  if (arr[0] === arr[4] && arr[4] === arr[8] && arr[8] !== null || arr[2] === arr[4] && arr[4] === arr[6] && arr[6] !== null) {
    return true;
  }
  return false;

}
//function to create a grid
grid.setAttribute('id', 'grid');
function createGrid(row,column){
for (let i = 0; i < row; i++) {
  const row = document.createElement('div');
  row.setAttribute('id', 'row');
  for (let j = 0; j < column; j++) {
    const cell = document.createElement('button');
    cell.setAttribute('class', 'cell');
    cell.setAttribute('id', pos);
    pos++;
    row.appendChild(cell);
  }
  grid.append(row);
}
container.append(grid);
}
//call the create grid function
createGrid(3,3);
//create the header 
const heading = document.createElement('h1');
heading.textContent = 'Tic-Tac-Toe';
container.insertBefore(heading, grid);
heading.style.color='#6cc644'
//the reset function
const cells=grid.querySelectorAll('button');
const reset=() => {
  arr=Array(9).fill(null);
  cells.forEach((cell)=>{
    cell.innerHTML='';
    move='x';
  })


}
//the call for each cell externaly
cells.forEach((cell)=>{
  cell.addEventListener('click',()=>{
    if (arr[cell.id] !== null) {
      return;
    }
    arr[cell.id] = move;
    cell.innerHTML = move;
    if (winner() === true) {
      alert('winner '+move);
      reset();
      return
    }
    
    move= next(move);
  })
}
)
//the rest button 
const resetcontain=document.createElement('div');
const resetButton=document.createElement('button');
resetButton.setAttribute('class','reset');
resetButton.innerHTML='Reset';
resetButton.addEventListener('click',()=>reset());
resetcontain.setAttribute('class','resetcontain');
resetcontain.appendChild(resetButton);
grid.appendChild(resetcontain);

//animations
const chooseWord=()=>{
  let roll=Math.random()*100;
  if (roll<50){
    return 'x';
  }
  return 'o';

}
const wordx=document.createElement('div');
wordx.setAttribute('class','wordx');
function printWords() {
  let randomNos = Math.random() * 100;
  for (let i = 0; i < randomNos; i++) {
    const words = document.createElement('div');
    words.innerHTML = chooseWord();
    words.innerHTML === 'x' ? words.style.color = '#6e5494' : words.style.color = 'white';
    wordx.appendChild(words);
    words.setAttribute('id', 'words' + i);
    // Set the position of the character randomly on the page, but not in the center or behind the grid or heading or outside of the page
    words.style.position = 'absolute';
    let x, y;
    let gridRect = grid.getBoundingClientRect();
    let headingRect = heading.getBoundingClientRect();
    do {
      x = Math.random() * (window.innerWidth - words.offsetWidth);
      y = Math.random() * (window.innerHeight - words.offsetHeight);
    } while ((Math.abs(x - window.innerWidth / 2) < 50 && Math.abs(y - window.innerHeight / 2) < 50) || (x > gridRect.left && x < gridRect.right && y > gridRect.top && y < gridRect.bottom) || (x > headingRect.left && x < headingRect.right && y > headingRect.top && y < headingRect.bottom));
    words.style.left = x + 'px';
    words.style.top = y + 'px';
    // Apply the rotation animation to the character
    words.style.animation = 'rotate 2s infinite linear';
  }
  document.body.appendChild(wordx);
}



printWords();

