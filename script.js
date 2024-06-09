const Board = (function() {
    let boardArray = [['','',''],['','',''],['','','']];

    const writeToBoard = function(j, k, mark) {
        Board.boardArray[j].splice(k, 1, mark)
    }

    const clearBoard = function() {
        return Board.boardArray = [['','',''],['','',''],['','','']];
    }

    return {boardArray, writeToBoard, clearBoard}
})();

const Players = (function() {
    let playerList = [];

    const createPlayer = function(name) {
        let marker;
        if (Players.playerList.length == 0) {
            marker = 'x'
        } else {
            marker = 'o'
        }
        Players.playerList.push({name, marker})
    }

    //cycles player turns by cycling through an array
    let i = 0;
    const markerIndex = () => [playerList[0].marker, playerList[1].marker];
    const alternateTurns = function() {
        let marker;
        if (playerList.length == 2) {
            i == 0 ? i++ : i--;
            marker = markerIndex()[i];
            return marker;
        } else {
            alert('no players assigned')
        }
    }

    const clearPlayerList = function() {
        return Players.playerList = []
    }

    return {playerList, createPlayer, alternateTurns, clearPlayerList}
})();

const Game = (function() {
    
    const main = function() {
        let playerOne = prompt("Enter Player 1 name")
        let playerTwo = prompt("Enter Player 2 name")
        Players.createPlayer(playerOne)
        Players.createPlayer(playerTwo)
        console.log(Players.playerList)
        //while prompts players until game win or full board
        for (let i = 0; i <= Board.boardArray.length; i++) { //temp
            Players.alternateTurns()
            
            //getPlayerSelection function
            //write to board function

        }
    }

    const coords = function(j, k) {
        position = []
        if ((j <= 2 && j >= 0) && (k <= 2 && k >= 0)) {
            position.push(j)
            position.push(k)
            console.log(position)
            return position
        }
    }
    return {main, coords}
})();