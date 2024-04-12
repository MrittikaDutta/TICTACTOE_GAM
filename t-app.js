const game = document.getElementById('game');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const currentPlayerElement = document.getElementById('current-player'); // Reference to the current player element

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Update the current player display
function updateCurrentPlayerDisplay() {
    currentPlayerElement.textContent = `Current player: ${currentPlayer}`;
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // Check for a win or a tie
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
        } else if (checkTie()) {
            alert('It\'s a tie!');
            gameActive = false;
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayerDisplay(); // Update the current player display
        }
    }
}

// Check for a win
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === currentPlayer);
    });
}

function checkTie() {
    return gameBoard.every(cell => cell !== '');
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    updateCurrentPlayerDisplay();

    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

updateCurrentPlayerDisplay();
