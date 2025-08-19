const gameBoard = (function () {
    let board = new Array(9).fill(null);



    return (board);

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
})();

