const { createBoard, clickCell, flagCell, revealAllMines } = require('./script');

describe('Minesweeper', () => {
    let cells;
    let grid;

    beforeEach(() => {
        document.body.innerHTML = '<div id="minesweeper"></div>';
        grid = document.getElementById('minesweeper');
        cells = createBoard(grid, 10, 10, 20);
    });

    test('should create a board with the correct number of cells', () => {
        expect(cells.length).toBe(100);
    });

    test('should mark a cell as revealed when clicked', () => {
        const cell = cells[0];
        clickCell(cell);
        expect(cell.classList.contains('revealed')).toBe(true);
    });

    test('should flag a cell when right-clicked', () => {
        const cell = cells[0];
        const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
        cell.dispatchEvent(event);
        flagCell(cell);
        expect(cell.classList.contains('flagged')).toBe(true);
        expect(cell.innerHTML).toBe('🚩');
    });

    test('should reveal all mines when a mine is clicked', () => {
        const mineCell = cells.find(cell => cell.dataset.type === 'mine');
        clickCell(mineCell);
        revealAllMines();
        const mineCells = cells.filter(cell => cell.dataset.type === 'mine');
        mineCells.forEach(cell => {
            expect(cell.classList.contains('revealed')).toBe(true);
            expect(cell.classList.contains('mine')).toBe(true);
        });
    });

    test('should not reveal flagged cells when clicked', () => {
        const cell = cells[0];
        const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
        cell.dispatchEvent(event);
        flagCell(cell);
        clickCell(cell);
        expect(cell.classList.contains('revealed')).toBe(false);
    });
});
