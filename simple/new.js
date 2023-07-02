const container = document.querySelector('#container');
const grid = document.createElement('div');
k = 'x';
pos = 0;
let arr = Array(9).fill(null);

let next = (k) => {
  if (k == 'x')
    return k = 'o';
  else
    return k = 'x';
};
let reset=() =>{
  arr=Array(9).fill(null)
}
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
grid.setAttribute('id', 'grid');
for (let i = 0; i < 3; i++) {
  const row = document.createElement('div');
  row.setAttribute('id', 'row');
  for (let j = 0; j < 3; j++) {
    const cell = document.createElement('button');
    cell.setAttribute('class', 'cell');
    cell.setAttribute('id', pos);
    pos++;
    cell.onclick = () => {
      if (arr[cell.id] !== null) {
        return;
      }
      cell.innerHTML = k;
      arr[cell.id] = k;
      if (winner() === true) {
        alert('winner ');
        return;
      }
      
      k = next(k);
    }
    row.appendChild(cell);

  }
  grid.append(row);
}
container.append(grid);