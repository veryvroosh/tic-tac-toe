
const game = (function() {
    let gameBoard = [];
    let roundIndicator = 1;

    const cells = document.querySelectorAll(".game-cell");

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {

            let placement = Number.parseInt(cell.name);
            if (roundIndicator%2 === 1) {
                gameBoard[placement-1] = "X";
                cell.textContent = "X";
                if(game.checkWin()===true) {
                    console.log("Player 1 Won");
                }
            } else {
                gameBoard[placement-1] = "O";
                cell.textContent = "O";
                if(game.checkWin()===true) {
                    console.log("Player 2 Won");
                }
            }

            cell.disabled = true;

            game.displayBoard();
            roundIndicator++;
        });
    });

    return {
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

      /*  displayBoard: function () {
            console.log(gameBoard[0], gameBoard[1], gameBoard[2]);
            console.log(gameBoard[3], gameBoard[4], gameBoard[5]);
            console.log(gameBoard[6], gameBoard[7], gameBoard[8]);
        }*/
    }
})();


