// IIFE that does everything lmao
const game = (function() {

    /*      DECLARATIONS     */
    let gameBoard = [];
    let roundIndicator = 0;
    let eventListeners = [];

    let player1wins = 0, player2wins = 0, drawCount = 0;

    let player1name = "vroosh";
    let player2name = "melovi";

    const cells = document.querySelectorAll(".game-cell");
    const currentPlayer = document.querySelector("#current-turn");
    const winDiv = document.createElement("div");
    const playerWinDiv = document.createElement("div");
    const restartButton = document.querySelector("#restart-button");
    const player1score = document.querySelector("#player1-score");
    const player2score = document.querySelector("#player2-score");
    const drawScore = document.querySelector("#draw-score");

    player1score.textContent = `${player1name} Wins: ${player1wins}`;
    player2score.textContent = `${player2name} Wins: ${player2wins}`;
    drawScore.textContent = `Draw Count: ${drawCount}`;
    /*      DECLARATIONS     */


    // restart button resets everything to 0
    restartButton.addEventListener('click', () => {
        game.removeEventListeners();
        game.cleanGame();
        game.playRound();
        player1wins = 0;
        player2wins = 0;
        drawCount = 0;
        player1score.textContent = `${player1name} Wins: ${player1wins}`;
        player2score.textContent = `${player2name} Wins: ${player2wins}`;
        drawScore.textContent = `Draw Count: ${drawCount}`;

    });


    function handleCellClick(cell) {
        cell.disabled = true;
        roundIndicator++;

        let placement = Number.parseInt(cell.name);
        if (roundIndicator%2 === 1) {       // if player1's turn
            currentPlayer.textContent = `${player2name}'s Turn`;
            gameBoard[placement-1] = "X";
            cell.textContent = "X";
            cell.classList.remove("hover1");
            cell.classList.add("stay1");

            cells.forEach((box) => {
                if(!box.classList.contains("stay1")) {
                    box.classList.remove("hover1");
                    box.classList.add("hover2");
                }
            })

            if (game.checkWin() === true) {
                currentPlayer.textContent = `${player1name}'s Turn`;
                player1wins++;
                player1score.textContent = `${player1name} Wins: ${player1wins}`;
                game.roundWon(player1name)
            }
        } else {        // if player2's turn
            currentPlayer.textContent = `${player1name}'s Turn`;
            gameBoard[placement-1] = "O";
            cell.textContent = "O";
            cell.classList.add("stay2");

            cells.forEach((box) => {
                if(!box.classList.contains("stay2")) {
                    box.classList.remove("hover2");
                    box.classList.add("hover1");
                }
            })

            if (game.checkWin() === true) {
                currentPlayer.textContent = `${player2name}'s Turn`;
                player2wins++;
                player2score.textContent = `${player2name} Wins: ${player2wins}`;
                game.roundWon(player2name);
            }
        }

        // checks for draw
        if(roundIndicator === 9 && game.checkWin()===false) {
            winDiv.classList.add("game-won");
            document.body.classList.add("blurred");
            playerWinDiv.textContent = `Draw`;
            winDiv.appendChild(playerWinDiv);
            document.body.appendChild(winDiv);
            game.removeEventListeners();
            drawCount++;
            drawScore.textContent = `Draw Count: ${drawCount}`;
            setTimeout(startGame, 3000);
        }
    }

    return {
        playRound: function () {
            currentPlayer.textContent = `${player1name}'s Turn`;
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
            winDiv.classList.add("game-won");
            document.body.classList.add("blurred");
            playerWinDiv.textContent = `${winnerName} won the game!`;
            winDiv.appendChild(playerWinDiv);

            document.body.appendChild(winDiv);

            cells.forEach(cell => {
                cell.classList.remove("hover1", "hover2", "stay1", "stay2");
            });


            game.removeEventListeners();
            setTimeout(startGame, 3000);
        },

        // cleans game to ready a new game
        cleanGame: function() {

            winDiv.remove();
            document.body.classList.remove("blurred");

            roundIndicator = 0;
            for(let i=0; i<9; i++) {
                gameBoard[i] = undefined;
            }

            cells.forEach(cell => {
                cell.classList.add("hover1");
                cell.classList.remove("hover2", "stay1", "stay2");

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

        setPlayer1Name: function(name) {
            player1name = name;
            player1score.textContent = `${player1name} Wins: ${player1wins}`;
        },

        setPlayer2Name: function(name) {
            player2name = name;
            player2score.textContent = `${player2name} Wins: ${player2wins}`;
        }
    };
})();

function startGame () {
    game.cleanGame();
    game.playRound();
}

startGame();