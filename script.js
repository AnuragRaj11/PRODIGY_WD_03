document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    const modeSelectionModal = document.getElementById('modeSelectionModal');
    const playWithFriendButton = document.getElementById('playWithFriend');
    const playWithAIButton = document.getElementById('playWithAI');

    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let playWithAI = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || checkWinner()) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWinner()) {
            statusDisplay.textContent = `Player ${currentPlayer} has won!`;
            return;
        }

        if (gameState.includes("")) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

            if (playWithAI && currentPlayer === 'O') {
                setTimeout(makeAIMove, 500);
            }
        } else {
            statusDisplay.textContent = `Game ended in a draw!`;
        }
    }

    function makeAIMove() {
        let emptyCells = [];
        gameState.forEach((cell, index) => {
            if (cell === "") {
                emptyCells.push(index);
            }
        });

        if (emptyCells.length === 0) return;

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;

        if (checkWinner()) {
            statusDisplay.textContent = `Player ${currentPlayer} has won!`;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function restartGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
    }

    function showModeSelectionModal() {
        modeSelectionModal.style.display = 'flex';
    }

    function closeModeSelectionModal() {
        modeSelectionModal.style.display = 'none';
    }

    function chooseMode(mode) {
        playWithAI = (mode === 'AI');
        closeModeSelectionModal();
        restartGame();
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    playWithFriendButton.addEventListener('click', () => chooseMode('Friend'));
    playWithAIButton.addEventListener('click', () => chooseMode('AI'));

    showModeSelectionModal();
});
