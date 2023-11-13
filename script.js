const Board = (function() {
    let boardArray = [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    const writeToBoard = function(j, k, marker) {
        boardArray[j].splice(k, 1, marker)
    }

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

const Players = (function() {
    let playerList = []

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
        }
        return {playerName, playerMarker};
    }

    const markerIndex = () => [Players.playerList[0].playerMarker, Players.playerList[1].playerMarker]
    
    let i = 0; //random number to pick first turn? currently Os always go first by nature of getPlayerMarker
    const getPlayerMarker = function() { //cycles between x and o via markerIndex indexes 
        let marker;
        if (markerIndex().length == 2) {
            i == 1 ? i-- : i++;
            marker = markerIndex()[i];
            return marker;
        } else {
            alert('no players assigned')
        }
    }

    const getPlayerSelection = function(coords, currentMark) {
        // const coords = Display.getCoords();
        const j = parseInt(coords.split('')[0]),
            k = parseInt(coords.split('')[2]);
        if (Board.boardArray[j][k]) {
            alert("This space has already been selected")
            getPlayerSelection();
        } else {
            // return chosenCell;
            Board.writeToBoard(j, k, currentMark);
            console.log(Board.boardArray);
            
        }
    }
    return {playerList, createUser, getPlayerMarker, getPlayerSelection}
})();

const Game = (function() {
    const takeTurns = function(coords) {
        let currentMark = Players.getPlayerMarker()
        if (!Board.checkFullBoard()) {
            Players.getPlayerSelection(coords, currentMark);
            if (checkWin(Board.boardArray)) {
                  
                alert(`Game Over! ${currentMark}'s won!`)
            }
        } else {
            alert('tie game')
        }
    }

    const checkWin = function(arr) {
        const getCols = (function() {
            let cols = [];
            const col = (arr, n) => arr.map(x => x[n])
            for (let i = 0; i < arr.length; i++) {
                cols.push(col(arr, i));
            } 
            return cols
        })();

        const getDiags = (function() {
            let posDiag = [],
                negDiag = [],
                step = 0;
            for (let i = 0; i < arr.length; i++) {
                negDiag.push(arr[i][step])
                step++;
            }
            step = 0;
            for (let j = arr.length - 1; j >=0; j--) {
                posDiag.push(arr[j][step]);
                step++;
            }
            let diags = [negDiag, posDiag]
            return diags
        })();
        
        let gameWon = false;
        const checkFalsy = (e) => e === false;
        const findMatch = function(arr) {
            let exit = false;
            arr.forEach(i => {
                if (!exit) {
                    let inner = []; // track booleans
                    i.forEach(j => {i[0] !== ''
                        ? j === i[0] 
                            ? inner.push(true) 
                            : inner.push(false)
                        : inner.push(false);
                    })
                    if (!inner.some(checkFalsy)) {
                        exit = true;
                        gameWon = true;
                    }
                }
            });
        }
        let allDirs = arr.concat(getCols, getDiags)
        findMatch(allDirs)
        return gameWon
    };
    return {takeTurns, checkWin}
})();

const cells = Array.from(document.getElementsByClassName('cell'))
cells.forEach((cell) => {
    const row = cell.parentNode.id
    cell.addEventListener('click', () => {
        let coords = `${row},${cell.id}`
        Game.takeTurns(coords)
        
    })        
})
