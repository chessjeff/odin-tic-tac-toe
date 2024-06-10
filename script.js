const Board = (function() {
    let boardArray = [['','',''],['','',''],['','','']];

    const writeToBoard = function(selection, mark) {
        const j = parseInt(selection.split('')[0]),
            k = parseInt(selection.split('')[2]);
        if (j > 2 || k > 2) {
            alert("invalid choice")
            Game.turn(mark);
        } else if (Board.boardArray[j][k]) {
            alert("This space has already been selected")
            Game.turn(mark);
        } else {
            Board.boardArray[j].splice(k, 1, mark)
            //Display logic branches from game logic here
            Display.displayBoard(j, k, mark)
        }
    }

    let checkedArr = []
    const checkFullBoard = function() {
        for (let a in Board.boardArray) {
            for (let b in a) {
                if (b) {
                    Board.checkedArr.push(b);
                }
            }
            console.log(Board.checkedArr)
            let result = Board.checkedArr.length >= 9; //eventually substitute with variable so any size board is possible
            return result; // Bool
        }
    }

    const clearBoard = function() {
        return Board.boardArray = [['','',''],['','',''],['','','']];
    }

    const clearCheck = function() {
        return Board.checkedArr = [];
    }

    return {boardArray, writeToBoard, checkedArr, checkFullBoard, clearBoard, clearCheck}
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
    const alternateTurns = function() {
        let mark;
        if (playerList.length == 2) {
            i == 1 ? i-- : i++;
            mark = playerList[i].marker;
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
        while (!checkWin(Board.boardArray)) {
            let mark = Players.alternateTurns()
            //incase player chooses already chosen spot, doesn't skip their turn
            Game.turn(mark);
            if (Game.checkWin(Board.boardArray)) {
                alert(`Game Over! ${mark} won!`)
                break;
            } else if (Board.checkFullBoard()) {
                alert('Tie Game!')
                break;
            }
        }
        alert("Please reset the game")
    }

    const turn = function(mark) {
        let selection = Game.getSelection() //string
        Board.writeToBoard(selection, mark) //split str into 2 nums. place mark in spot
        console.log(Board.boardArray)
    }

    const getSelection = () => prompt("Enter Cell (j,k)")

    const resetGame = function() {
        Board.clearBoard()
        Board.clearCheck()
        Players.clearPlayerList()
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
        const findWin = function(arr) {
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
        findWin(allDirs)
        return gameWon
    };

    return {main, turn, getSelection, resetGame, checkWin}
})();

const Display = (function() {
    const rows = Array.from(document.getElementsByClassName('container')),
        cells = Array.from(document.getElementsByClassName('cell'))

    const displayBoard = function(j, k, mark) {
        if (!Game.checkWin(Board.boardArray)) {
            Display.rows.forEach((row) => {
                if (row.id == j) {
                    Display.cells.forEach((cell) => {
                        if (cell.id == k) {
                            cell.textContent = mark;
                        }
                    })
                }
            })
        }
    }

    return {rows, cells, displayBoard}
})()