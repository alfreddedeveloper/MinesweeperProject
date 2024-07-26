//First declare all the variables needed 
document.addEventListener('DOMContentLoaded', () => {
    const width = 10;
    const height = 10;
    const minesCount = 20;
    const grid = document.getElementById('minesweeper');
    const cells = createBoard(grid, width, height, minesCount);

    //function to create the minesweeper board
    function createBoard(grid, width, height, minesCount) {
        const cells = [];
        const mineArray = Array(minesCount).fill('mine');
        const emptyArray = Array(width * height - minesCount).fill('empty');
        const gameArray = emptyArray.concat(mineArray).sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * height; i++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', i);
            cell.classList.add('cell');
            cell.dataset.type = gameArray[i];
            grid.appendChild(cell);
            cells.push(cell);

            cell.addEventListener('click', () => {
                clickCell(cell);
            });

            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                flagCell(cell);
            });
        }

        for (let i = 0; i < cells.length; i++) {
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);

            if (cells[i].dataset.type === 'empty') {
                let total = 0;
                if (i > 0 && !isLeftEdge && cells[i - 1].dataset.type === 'mine') total++;
                if (i > 9 && !isRightEdge && cells[i + 1 - width].dataset.type === 'mine') total++;
                if (i > 10 && cells[i - width].dataset.type === 'mine') total++;
                if (i > 11 && !isLeftEdge && cells[i - 1 - width].dataset.type === 'mine') total++;
                if (i < 98 && !isRightEdge && cells[i + 1].dataset.type === 'mine') total++;
                if (i < 90 && !isLeftEdge && cells[i - 1 + width].dataset.type === 'mine') total++;
                if (i < 88 && !isRightEdge && cells[i + 1 + width].dataset.type === 'mine') total++;
                if (i < 89 && cells[i + width].dataset.type === 'mine') total++;
                cells[i].setAttribute('data', total);
            }
        }
        return cells;
    }

    function clickCell(cell) {
        const cellId = cell.id;
        if (cell.classList.contains('revealed') || cell.classList.contains('flagged')) return;

        if (cell.dataset.type === 'mine') {
            revealAllMines();
            alert('Game Over');
            return;
        }

        const total = cell.getAttribute('data');
        if (total != 0) {
            cell.classList.add('revealed');
            cell.innerHTML = total;
            return;
        }

        revealEmptyCells(cellId);
    }

    function revealEmptyCells(cellId) {
        const isLeftEdge = (cellId % width === 0);
        const isRightEdge = (cellId % width === width - 1);

        setTimeout(() => {
            if (cellId > 0 && !isLeftEdge) {
                const newId = cells[parseInt(cellId) - 1].id;
                const newCell = document.getElementById(newId);
                clickCell(newCell);
            }
            if (cellId > 9 && !isRightEdge) {
                const newId = cells[parseInt(cellId) + 1 - width].id;
                const newCell = document.getElementById(newId);
                clickCell(newCell);
            }
            if (cellId > 10) {
                const newId = cells[parseInt(cellId) - width].id;
                const newCell = document.getElementById(newId);
                clickCell(newCell);
            }
            if (cellId > 11 && !isLeftEdge) {
                const newId = cells[parseInt(cellId) - 1 - width].id;
                const newCell = document.getElementById(newId);
                clickCell(newCell);
            }
            if (cellId < 98 && !isRightEdge) {
                const newId = cells[parseInt(cellId) + 1].id;
                const newCell = document.getElementById(newId);
                clickCell(newCell);
            }
            if (cellId < 90 && !isLeftEdge) {
                const newId = cells[parseInt(cellId) - 1 + width].id;
                const newCell = document.getElementById(newId);
                clickCell(newCell);
            }
            if (cellId < 88 && !isRightEdge) {
                const newId = cells[parseInt(cellId) + 1 + width].id;
                const newCell = document.getElementById(newId);
                clickCell(newCell);
            }
            if (cellId < 89) {
                const newId = cells[parseInt(cellId) + width].id;
                const newCell = document.getElementById(newId);
                clickCell(newCell);
            }
        }, 10);
    }

    function flagCell(cell) {
        if (cell.classList.contains('revealed')) return;
        if (cell.classList.contains('flagged')) {
            cell.classList.remove('flagged');
            cell.innerHTML = '';
        } else {
            cell.classList.add('flagged');
            cell.innerHTML = '🚩';
        }
    }

    function revealAllMines() {
        cells.forEach(cell => {
            if (cell.dataset.type === 'mine') {
                cell.classList.add('revealed');
                cell.classList.add('mine');
            }
        });
    }
});

module.exports = { createBoard, clickCell, flagCell, revealAllMines };
