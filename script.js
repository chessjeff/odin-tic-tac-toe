const Board = (function() {
    let boardArray = [['','',''],['','',''],['','','']];

    const writeToBoard = function(selection, mark) {
        const j = parseInt(selection.split('')[0]),
            k = parseInt(selection.split('')[2]);
        if (Board.boardArray[j][k]) {
            alert("This space has already been selected")
            Game.turn();
        }
        Board.boardArray[j].splice(k, 1, mark)
    }

    let checkedArr = []
    const checkFullBoard = function() {
        for (let a in Board.boardArray) {
            for (let b in a) {
                if (b) {
                    Board.checkedArr.push(b);
                }
            }
            let result = Board.checkedArr.length > 8; //eventually substitute with variable so any size board is possible
            return result; // Bool
        }
    }

    const clearBoard = function() {
        return Board.boardArray = [['','',''],['','',''],['','','']];
    }

    return {boardArray, writeToBoard, checkedArr, checkFullBoard, clearBoard}
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
        let mark;
        if (playerList.length == 2) {
            i == 0 ? i++ : i--;
            mark = markerIndex()[i];
            return mark;
        }
    }

    const clearPlayerList = function() {
        return Players.playerList = []
    }

    return {playerList, createPlayer, alternateTurns, clearPlayerList}
})();

const Game = (function() {
    
    const main = function() {
        Players.createPlayer(prompt("Enter Player 1 Name"))
        Players.createPlayer(prompt("Enter Player 2 Name"))
        console.log(Players.playerList)
        //while prompts players until game win or full board
        while (Board.checkFullBoard) {
            let mark = Players.alternateTurns()
            //incase player chooses already chosen spot, doesn't skip their turn
            Game.turn(mark);
        }
    }

    const turn = function(mark) {
        let selection = Game.getSelection() //string
        console.log({selection})
        Board.writeToBoard(selection, mark) //split str into 2 nums. place mark in spot
        console.log(Board.boardArray)
    }

    const getSelection = () => prompt("Enter Cell (j, k)")

    return {main, turn, getSelection}
})();