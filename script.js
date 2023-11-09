const Board = (function() {
    let boardArray = ['','','',
                      '','','',
                      '','',''];
    const writeToBoard = function(cell, marker) {
        boardArray.splice(cell, 1, marker)
    }
    return {boardArray, writeToBoard}
})();

const Players = (function(){
    const playerList = []

    const createUser = function(name) {
        const playerName = name;
        const playerMarker = (function() {
            let marker;
            if (playerList.length == 0) {
                marker = 'X'
            } else if (playerList.length == 1) {
                marker = 'O'
            }
            return marker;
        })();
        if (playerList.length < 2) {
            playerList.push({playerName, playerMarker});
        } //playerList[{name, marker}, {name, marker}]
        return {playerName, playerMarker};
    }

    const markerIndex = () => [Players.playerList[0].playerMarker, Players.playerList[1].playerMarker]

    return {playerList, createUser, markerIndex}
})();

const Game = (function() {
    let i = 0; //random number to pick first turn? //currently Os always go first by nature of getPlayerMarker
    const getPlayerMarker = function() { //cycles between x and o via markerIndex indexes 
        let marker;
        if (Players.markerIndex().length == 2) {
            if (i == 1) {
                i--;
            } else {
                i++;
            }
            marker = Players.markerIndex()[i];
            return {marker};
        } else {
            alert('no players assigned')
        }
    }

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
                Board.writeToBoard(chosenCell, Game.getPlayerMarker().marker);
                console.log(Board.boardArray)
            }
        } else {
            alert('game board full')
        }
    }

    const takeTurns = function() {
        //call getPlayerSelection until game is won or tied
        //checkWin function that will decide when the game is over
        //otherwise call itself
        if (!Board.boardArray.every(Boolean)) {
            getPlayerSelection();
        }
    }

    return {getPlayerSelection, getPlayerMarker, takeTurns}
})();