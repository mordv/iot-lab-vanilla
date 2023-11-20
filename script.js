const matrixSize = 8;
const matrix = Array.from({length: matrixSize}, () => Array.from({length: matrixSize}, () => false));
const handleKey = (key) => {
    alert(key);
}

const getDotId = (i, j) => `dot${i};${j}`;
const init = () => {
    const left = document.getElementById('btnLeft');
    const right = document.getElementById('btnRight');
    const up = document.getElementById('btnUp');
    const down = document.getElementById('btnDown');

    left.addEventListener('click', () => handleKey('left'))
    right.addEventListener('click', () => handleKey('right'))
    up.addEventListener('click', () => handleKey('up'))
    down.addEventListener('click', () => handleKey('down'))

    document.addEventListener('keydown', ({key}) => {
        if (getMode() === 'snake' && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
            handleKey(key.substring(5).toLowerCase());
        }
    })

    const controls = document.getElementById('controls');
    const field = document.getElementById('field');
    for (let i = 0; i < matrixSize; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        for (let j = 0; j < matrixSize; j++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.id = getDotId(i, j);
            dot.addEventListener('click', () => handleDotClick(i, j));
            row.appendChild(dot);
        }
        field.appendChild(row);
    }

    document.getElementById('select').addEventListener('change', ({target: {value}}) => {

        if (value === 'draw') {
            field.style.display = 'flex';
            controls.style.display = 'none';
        } else {
            field.style.display = 'none';
            controls.style.display = 'flex';
        }
    })
}

const handleDotClick = (x, y) => {
    matrix[x][y] = !matrix[x][y];
    drawField();
}

const getMode = () => document.getElementById('select').value
const drawField = () => {
    for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
            const dot = document.getElementById(getDotId(i, j));
            dot.style.background = matrix[i][j] ? 'red' : '#770000';
        }
    }
}

init();
