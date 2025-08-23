
const gameBoard = (function () {
    let board = new Array(9).fill(null);

    const getBoard = () => board;

    const isFull = () => board.every(cell => cell != null);

    //marks indicator in array index
    const setCell = (index, marker) => {
        if (board[index] == null) {
            board[index] = marker;
            return true;
        }
        return false;
    }

    const resetBoard = () => {
        board = new Array(9).fill(null);
    }

    return { getBoard, setCell, resetBoard, isFull };

})();

const Player = function (name, indicator) {
    let points = 0;
    let markerSquares = new Map();

    const addMap = (index) => markerSquares.set(index, indicator);

    const resetMap = () => {
        markerSquares = new Map();
    }

    //checks if key value pair exist
    const hasKey = (key, indicator) => {
        if (markerSquares.has(key, indicator)) {
            return true;
        }
        return false;
    }

    const getPoints = () => points;

    const addPoint = () => points++;

    return { name, indicator, getPoints, addPoint, addMap, resetMap, hasKey };
};

const gameController = (function () {
    const displayPlayer = document.querySelector(".player-turn");
    const playerPick = document.querySelector(".board");
    const winSequences = [
        [0, 1, 2],
        [0, 4, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    const player1Pts = document.querySelector(".player1");
    const player2Pts = document.querySelector(".player2");
    let player1Name;
    let player2Name;
    let player1;
    let player2;
    let currentPlayer;
    const play = document.querySelector(".start");
    const userNames = document.querySelector("#names");
    const confirmBtn = document.querySelector("#confirmBtn");
    const player1Input = document.querySelector("#player1");
    const player2Input = document.querySelector("#player2");

    play.addEventListener("click", () => {
        userNames.showModal();
    });
    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault();
        player1Name = player1Input.value;
        player2Name = player2Input.value;
        player1 = Player(player1Name, "X");
        player2 = Player(player2Name, "O");

        player1Pts.textContent = `Player 1 Points: ${player1.getPoints()}`
        player2Pts.textContent = `Player 2 Points: ${player2.getPoints()}`
        currentPlayer = player1;
        displayPlayer.textContent = `${currentPlayer.name}'s Turn`;
        userNames.close();
    });






    //marks the cell player chose on click
    playerPick.addEventListener("click", (e) => {
        if (e.target.classList.contains("cell")) {
            let index = parseInt(e.target.dataset.cell, 10);
            e.target.textContent = currentPlayer.indicator;
            playTurn(index);
        }
    });



    const playTurn = (index) => {
        if (gameBoard.setCell(index, currentPlayer.indicator)) {
            currentPlayer.addMap(index, currentPlayer.indicator);
            if (gameWon()) {
                gameWon();
                _switchTurnWon(currentPlayer);
            }
            else if (gameOver()) {
                _switchTurnTie();
            }
            else {
                _switchTurn();
            }
        }
    }

    const _switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        displayPlayer.textContent = `${currentPlayer.name}'s Turn`;
    }

    const _switchTurnWon = (winner) => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        displayPlayer.textContent = `${winner.name} Wins!! ${currentPlayer.name}'s Turn.`;
    }

    const _switchTurnTie = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        displayPlayer.textContent = `It's a Tie! ${currentPlayer.name}'s Turn`;
    }

    const getCurrentPlayer = () => currentPlayer;

    const gameWon = () => {
        for (let sequences of winSequences) {
            if (sequences.every(index => getCurrentPlayer().hasKey(index, getCurrentPlayer().indicator))) {
                currentPlayer.addPoint();
                player1Pts.textContent = `Player 1 Points: ${player1.getPoints()}`
                player2Pts.textContent = `Player 2 Points: ${player2.getPoints()}`
                gameBoard.resetBoard();
                player1.resetMap();
                player2.resetMap();
                const cells = document.querySelectorAll(".cell");
                cells.forEach(cell => {
                    cell.textContent = "";
                });
                return true;
            }
        }
        return false;
    }

    const gameOver = () => {

        if (gameBoard.isFull()) {
            displayPlayer.textContent = `It's a Tie!!`;
            gameBoard.resetBoard();
            player1.resetMap();
            player2.resetMap();
            const cells = document.querySelectorAll(".cell");
            cells.forEach(cell => {
                cell.textContent = "";
            });
            return true;
        }
        return false;
    }

    return { playTurn, getCurrentPlayer, gameWon }

})();

