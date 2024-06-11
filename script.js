const Board = (function() {
    let boardArray = [['','',''],['','',''],['','','']];
    let invalidSpace = false

    const writeToBoard = function(row, cell, mark) {
        if (Board.boardArray[row][cell]) {
            Board.invalidSpace = true;
            Players.alternateTurns(); //to not skip player's turn
            console.log('This space has already been selected')
        } else {
            Board.boardArray[row].splice(cell, 1, mark)
            Display.displayBoard(row, cell, mark)
        }
    }

    let checkedArr = []
    const checkFullBoard = function() {
        if (!Board.invalidSpace) {
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
    }

    const clearBoard = function() {
        return Board.boardArray = [['','',''],['','',''],['','','']];
    }

    const clearCheck = function() {
        return Board.checkedArr = [];
    }

    return {boardArray, invalidSpace, writeToBoard, checkedArr, checkFullBoard, clearBoard, clearCheck}
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

    const main = function(row, cell) {
        Board.invalidSpace = false
        let mark = Players.alternateTurns()
        Board.writeToBoard(row, cell, mark)
        let key = Game.endGame(mark);
        Display.turnOffBoard(key);
    }

    const endGame = function(mark) {
        let key;
        if (Game.checkWin(Board.boardArray)) {
            console.log(`Game Over! ${mark.toUpperCase()}s won!\nPlease reset the game`)
            key = 1;
        } else if (Board.checkFullBoard() && !Game.checkWin(Board.boardArray)) {
            console.log('Tie Game!\nPlease reset the game')
            key = 1;
        }
        return key;
    }

    const resetGame = function() {
        //Board.clearBoard()
        //Board.clearCheck()
        //Players.clearPlayerList()
        //Display.clearDisplay()
        location.href = location.href //hacky lol
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

    return {main, endGame, resetGame, checkWin}
})();

const Display = (function() {
    const rows = Array.from(document.getElementsByClassName('container')),
        cells = Array.from(document.getElementsByClassName('cell')),
        start = document.getElementById('start'),
        reset = document.getElementById('reset'),
        lock = false;

    const displayBoard = function(row, cell, mark) {
        let r = Array.from(Display.rows[row].children)
        r[cell].textContent = mark
    }

    //event listener function for all cells after players are selected
    const turnOnBoard = function() {
        console.log(lock)
        if (!lock) {
            cells.forEach((cell) => {
                let rowInt = parseInt(cell.parentNode.id)
                cell.addEventListener('click', () => {
                    cellInt = parseInt(cell.id)
                    console.log(rowInt, cellInt);
                    Game.main(rowInt, cellInt)
                })
            })
        }
    }

    const turnOffBoard = function(key) {
        if (key) {Display.lock = true}
    }

    const clearDisplay = function() {
        cells.forEach((cell) => cell.textContent = '')
    }

    start.addEventListener('click', () => {
        if (Players.playerList.length == 0) {
            Players.createPlayer(prompt("Enter Player 1 Name"))
            Players.createPlayer(prompt("Enter Player 2 Name"))
            console.log(Players.playerList)
            start.disabled = true
            turnOnBoard()
        }
    })

    reset.addEventListener('click', () => {
        Game.resetGame();
        start.disabled = false;
    })

    return {rows, cells, displayBoard, turnOffBoard, clearDisplay}
})()