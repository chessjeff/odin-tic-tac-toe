const Board = (function() {
    let boardArray = ['','','',
                      '','','',
                      '','',''];
    const writeToBoard = function(cell, marker) {
        boardArray.splice(cell, 1, marker)
    }
    return {boardArray, writeToBoard}
})();

const Game = (function(){
    const playerMarker = 'x'
    const getPlayerSelection = function() {
        if (!Board.boardArray.every(Boolean)) {
            chosenCell = parseInt(prompt("enter a number between 1 and 9")) - 1;
            if (chosenCell > 8 || chosenCell < 0 || isNaN(chosenCell)) {
                getPlayerSelection()
            } else if (Board.boardArray[chosenCell]) {
                alert("This space has already been selected")
                getPlayerSelection();
            } else {
                // return chosenCell;
                Board.writeToBoard(chosenCell, playerMarker);
            }
        } else {
            alert('game board full')
        }
    }
    

    console.log(Board.boardArray)

    return {playerMarker, getPlayerSelection}
})();

const Players = (function(){
    const playerCount = []

    const createUser = function(name) {
        const playerName = name;
        const playerMarker = (function() {
            let marker;
            if (playerCount.length == 0) {
                marker = 'X'
            } else if (playerCount.length == 1) {
                marker = 'O'
            }
            return marker;
        })();
        if (playerCount.length < 2) {
            playerCount.push({playerName, playerMarker});
            return {playerName, playerMarker};
        }
    }

    return {playerCount, createUser}
})();