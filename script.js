
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
    // const player1Name = prompt("Enter Player 1 Name");


    const player1 = Player("Yohan", "X");
    const player2 = Player("Ebner", "O");
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

    player1Pts.textContent = `Player 1 Points: ${player1.getPoints()}`
    player2Pts.textContent = `Player 2 Points: ${player2.getPoints()}`


    let currentPlayer = player1;

    //marks the cell player chose on click
    playerPick.addEventListener("click", (e) => {
        if (e.target.classList.contains("cell")) {
            let index = parseInt(e.target.dataset.cell, 10);
            e.target.textContent = currentPlayer.indicator;
            playTurn(index);
        }
    });

    displayPlayer.textContent = `${currentPlayer.name}'s Turn`;

    const playTurn = (index) => {
        if (gameBoard.setCell(index, currentPlayer.indicator)) {
            currentPlayer.addMap(index, currentPlayer.indicator);
            gameWon();
            _switchTurn();
        }
    }

    const _switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const getCurrentPlayer = () => currentPlayer;

    const gameWon = () => {
        for (let sequences of winSequences) {
            if (sequences.every(index => getCurrentPlayer().hasKey(index, getCurrentPlayer().indicator))) {
                displayPlayer.textContent = `${currentPlayer.name} Wins!!`;
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
            else if (gameBoard.isFull()) {
                displayPlayer.textContent = `It's a Tie!!`;
                gameBoard.resetBoard();
                player1.resetMap();
                player2.resetMap();
                const cells = document.querySelectorAll(".cell");
                cells.forEach(cell => {
                    cell.textContent = "";
                });
                return false;
            }
        }
        return false;
    }

    return { playTurn, getCurrentPlayer, gameWon }

})();

