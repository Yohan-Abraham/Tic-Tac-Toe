const gameBoard = (function () {
    let board = new Array(9).fill(null);
    let boardCell = document.querySelector(".cell");

    const getBoard = () => board;

    const setCell = (index, marker) => {
        if (board[index] == null) {
            board[index] = marker;
        }
    };

    const resetBoard = () => {
        board = new Array(9).fill(null);
    };

    return (getBoard, setCell, resetBoard);

})();

const Player = function (name, indicator) {
    let points = 0;

    const getPoints = () => points;

    const addPoint = () => points++;

    return { name, indicator, getPoints, addPoint };
};

const gameController = (function () {
    const player1 = Player("Yohan", "X");
    const player2 = Player("Ebner", "O");

    let currentPlayer = player1;

    const playTurn = (index) => {
        if (gameBoard.setCell(index, player1.indicator)) {
            _switchTurn();
        }
    }

    const _switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const getCurrentPlayer = () => currentPlayer;

    return { playTurn, getCurrentPlayer }

})();

