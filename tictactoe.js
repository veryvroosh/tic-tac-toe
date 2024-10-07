const game = (function() {

    let gameBoard = [];
    let roundIndicator = 0;
    let eventListeners = [];

    const cells = document.querySelectorAll(".game-cell");

    function handleCellClick(cell) {
        cell.disabled = true;
        roundIndicator++;
        console.log(roundIndicator);

        let placement = Number.parseInt(cell.name);
        if (roundIndicator%2 === 1) {
            gameBoard[placement-1] = "X";
            cell.textContent = "X";
            if (game.checkWin() === true) {
                game.roundWon("Player1")
            }
        } else {
            gameBoard[placement-1] = "O";
            cell.textContent = "O";
            if(game.checkWin()===true) {
                game.roundWon("Player2")
            }
        }
    }

    return {
        playRound: function () {
            cells.forEach((cell) => {
                const listener = () => handleCellClick(cell);
                cell.addEventListener('click', listener);
                eventListeners.push({ cell, listener });
            });
        },

        checkWin: function () {
            const winningPatterns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8], // Rows
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8], // Columns
                [0, 4, 8],
                [2, 4, 6], // Diagonals
            ];

            const winningPattern = (pattern) => {
                let [a, b, c] = pattern;
                return (gameBoard[a] !== undefined && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]);
            };

            return winningPatterns.some(winningPattern);
        },

        roundWon: function(winnerName) {
            console.log(`${winnerName} won the game!`);
            game.removeEventListeners();
            setTimeout(startGame, 3000);
        },

        cleanGame: function() {
            roundIndicator = 0;
            for(let i=0; i<9; i++) {
                gameBoard[i] = undefined;
            }

            cells.forEach(cell => {
                cell.textContent = "";
                cell.disabled = false;
            });
        },

        removeEventListeners: function () {
            eventListeners.forEach(({ cell, listener }) => {
                cell.removeEventListener('click', listener);
            });
            eventListeners = [];
        },

        displayBoard: function () {
            console.log(gameBoard[0], gameBoard[1], gameBoard[2]);
            console.log(gameBoard[3], gameBoard[4], gameBoard[5]);
            console.log(gameBoard[6], gameBoard[7], gameBoard[8]);
        }
    };
})();

function startGame () {
    game.cleanGame();
    game.playRound();
}

startGame();