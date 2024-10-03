function createPlayer (name, marker) {
    const playerName = name;
    const playerMarker = marker;

    return { playerName , playerMarker};
}

const game = (function() {
    let gameBoard = [];
    let roundIndicator = 1;

    return {
        playRound: function() {
            let placement = prompt("Where do you want to place your marker?");
            if (roundIndicator%2 === 1) {
                gameBoard[placement-1] = "X";
            } else {
                gameBoard[placement-1] = "O";
            }

            game.displayBoard();
            roundIndicator++;
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
                return gameBoard[a] !== null && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
            };

            return winningPatterns.some(winningPattern);
        },

        displayBoard: function () {
            console.log(gameBoard[0], gameBoard[1], gameBoard[2]);
            console.log(gameBoard[3], gameBoard[4], gameBoard[5]);
            console.log(gameBoard[6], gameBoard[7], gameBoard[8]);
        }
    }
})();


