const Board = (function() {
    let boardArray = [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    const writeToBoard = function(j, k, marker) {
        boardArray[j].splice(k, 1, marker)
    }
    
    //for larger boards:
        //i = boardArray.length
        //j = boardArray[0].length
        //size = i * j
        //useful when calling checkFullBoard
        //for now just checking grid size 3x3 so not important

    let checkedArr = [];
    const checkFullBoard = function() {
        for (let a in boardArray) {
            for (let b in a) {
                if (!b) {
                    break
                } else {
                    checkedArr.push(b);
                }
            }
            let result = checkedArr.length > 9; //eventually substitute with variable so any size board is possible
            return result; // Bool
        }
    }
    return {boardArray, writeToBoard, checkFullBoard}
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
                 
        const coord = prompt("enter a coordinate (x,y) where x and y are between 0 and 2");

        const j = parseInt(coord.split('')[0]),
            k = parseInt(coord.split('')[2]);
        if (j > 2 || j < 0 || isNaN(j) ||
            k > 2 || k < 0 || isNaN(k)) {
            getPlayerSelection()
        } else if (Board.boardArray[j][k]) {
            alert("This space has already been selected")
            getPlayerSelection();
        } else {
            // return chosenCell;
            Board.writeToBoard(j, k, Game.getPlayerMarker().marker);
            console.log(Board.boardArray)
            takeTurns();
        }
    }

    const takeTurns = function() {
        
        if (!Board.checkFullBoard()) {
            getPlayerSelection();
        } else {
            alert('tie game')
        }
    }



    return {getPlayerSelection, getPlayerMarker, takeTurns}
})();


let arr = [['x','o',''],['o','','o'],['x','','o']]

function checkWin(arr) {
    let gameWon = false;
    const checkFalsy = (e) => e === false;
    const checkRows = function() {
        let exit = false;
        arr.forEach(i => {
            if (!exit) {
                let inner = [];
                i.forEach(j => {
                    if (j === i[0]) {
                        inner.push(true);
                    } else {
                        inner.push(false);                 
                    }
                })
                if (!inner.some(checkFalsy)) {
                    exit = true;
                    gameWon = true;
                }
            }
        });
    }
    checkRows(arr);
    return {checkRows, gameWon}
};