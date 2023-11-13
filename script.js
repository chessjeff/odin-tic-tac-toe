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

const Players = (function() {
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
        }
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
        if (checkWin(Board.boardArray).gameWon) {
            alert('game over! someone won, idk who')
        } else if (!Board.checkFullBoard()) {
            getPlayerSelection();
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
            return {cols}
        })();

        const getDiags = (function() {
            let posDiag = [];
            let negDiag = [];
            let step = 0;
            for (let i = 0; i < arr.length; i++) {
                negDiag.push(arr[i][step])
                step++;
            }
            step = 0
            for (let j = arr.length - 1; j >=0; j--) {
                posDiag.push(arr[j][step]);
                step++
            }
            let diags = [negDiag, posDiag]
            return {diags}
        })();
        
        let gameWon = false;
        const checkFalsy = (e) => e === false;
        const findMatch = function(arr) {
            let exit = false;
            arr.forEach(i => {
                if (!exit) {
                    let inner = []; // track booleans
                    i.forEach(j => {
                        i[0] !== ''
                            ? j === i[0] 
                                ? inner.push(true) : inner.push(false)
                            : inner.push(false);
                    })
                    if (!inner.some(checkFalsy)) {
                        exit = true;
                        gameWon = true;
                    }
                }
            });
        }

        findMatch(arr)
        findMatch(getCols.cols)
        findMatch(getDiags.diags)

        return {findMatch, gameWon}
    };

    return {getPlayerSelection, getPlayerMarker, takeTurns, checkWin}
})();


/**
 * two test cases for diags
 * arr[0][0],arr[1][1],arr[2][2]
 * arr[2][2],arr[1][1],arr[0][0]
 * 
 * **method* each of these to their own arrays and push them to diags arr
 * findAllMatch(diags)
 * 
 * 
 * 
 */
// let arr = [['x','','o'],['','xo',''],['o','','x']]

// let j = 0;
// let negDiag = []
// //negative diag
// for (let i = 0; i < arr.length; i++) {
//     negDiag.push(arr[i][j])
//     j++
// }

// let l = 0;
// let posDiag = [];
// //positive diag
// for (let k = arr.length - 1; k >= 0; k--) {
//     posDiag.push(arr[k][l])
//     l++;
// }

// let diags = [negDiag, posDiag]

// console.log(diags)