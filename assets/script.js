const BOARD = document.getElementById('board');
var placedShips = []
var selectedSquares = []
var misses = 0
var totalShipsSunk = 0
var difficultyOptions = ["Easy", "Medium", "Hard"]
var ships;

const message = document.getElementById("message")

function selectSquare(element) {
    message.innerHTML = "&nbsp"
    if (selectedSquares.includes(element.id)) {
        message.innerHTML = "You have already picked that one"
    } else {
        selectedSquares.push(element.id)

        let hit = false
        var counter = 0
        var shipIndex = 0
        var shipName = ""
        for (let ship of placedShips) {
            counter += 1
            for (let coord of ship) {
                if (element.id == coord) {
                    hit = true
                    shipIndex = counter
                }
            }
        }
        if (hit == false) {
            element.style.backgroundColor = "gray"
            misses += 1
            document.getElementById("miss-counter").innerHTML = misses
        } else {
            shipSunk = true
            for (let coord of placedShips[shipIndex - 1]) {
                if (!selectedSquares.includes(coord)) {
                    shipSunk = false
                }
            }
            if (shipSunk) {
                var shipSankLength = placedShips[shipIndex - 1].length
                switch(shipSankLength) {
                    case 2:
                        shipName = "Destroyer"
                        break;
                    case 3:
                        shipName = "Submarine"
                        break;
                    case 4:
                        shipName = "Battleship"
                        break;
                    case 5:
                        shipName = "Aircraft Carrier"
                        break;
                }
                message.innerHTML = "HIT and sunk your enemies " + shipName
                totalShipsSunk += 1
                document.getElementById("ship-" + shipIndex).style.color = "red"
            } else {
                message.innerHTML = "HIT"
            }
            element.style.backgroundColor = "red"
        }
        if (totalShipsSunk == placedShips.length) {
            message.innerHTML = "CONGRATULATIONS YOU HAVE WON. You had " + misses + " misses. Try again and see if you can get fewer!"
            location.reload()
        }
    }
}

function placeShips(boardDimentions, ships) {
    placedShips = []

    for (let shipLength of ships) {
        var directionChoices = [];

        while (directionChoices.length == 0) {
            var coordX = (Math.floor(Math.random() * boardDimentions)) + 1;
            var coordY = (Math.floor(Math.random() * boardDimentions)) + 1;
            // create single list of all the coords used
            let usedCoords = [];
            for (let ship of placedShips) {
                for (let coord of ship) {
                    usedCoords.push(coord)
                }
            }
            
            if (coordX + shipLength -1 < boardDimentions) {
                let shipClash = false
                for (let i = 0; i < shipLength; i++) {
                    newCoord = (coordX + i) + "," + coordY
                    if(usedCoords.includes(newCoord)) {
                        shipClash = true
                    }
                }
                if (shipClash == false) {
                    directionChoices.push("right")
                }
            }
            if (coordX - shipLength + 1 > 0) {
                let shipClash = false
                for (let i = 0; i < shipLength; i++) {
                    newCoord = (coordX - i) + "," + coordY
                    if(usedCoords.includes(newCoord)) {
                        shipClash = true
                    }
                }
                if (shipClash == false) {
                    directionChoices.push("left")
                }
            }
            if (coordY + shipLength - 1 < boardDimentions) {
                let shipClash = false
                for (let i = 0; i < shipLength; i++) {
                    newCoord = coordX + "," + (coordY + i)
                    if(usedCoords.includes(newCoord)) {
                        shipClash = true
                    }
                }
                if (shipClash == false) {
                    directionChoices.push("up")
                }
            }
            if (coordY - shipLength + 1 > 0) {
                let shipClash = false
                for (let i = 0; i < shipLength; i++) {
                    newCoord = coordX + "," + (coordY - i)
                    if(usedCoords.includes(newCoord)) {
                        shipClash = true
                    }
                }
                if (shipClash == false) {
                    directionChoices.push("down")
                }
            }
        }

        let direction = directionChoices[(Math.floor(Math.random() * directionChoices.length))]
        switch(direction) {
            case "right":
                newShip = []
                for (let i = 0; i < shipLength; i++) {
                    newCoord = (coordX + i) + "," + coordY
                    newShip.push(newCoord)
                }
                placedShips.push(newShip)
                break;
            case "left":
                newShip = []
                for (let i = 0; i < shipLength; i++) {
                    newCoord = (coordX - i) + "," + coordY
                    newShip.push(newCoord)
                }
                placedShips.push(newShip)
                break;
            case "up":
                newShip = []
                for (let i = 0; i < shipLength; i++) {
                    newCoord = coordX + "," + (coordY + i)
                    newShip.push(newCoord)
                }
                placedShips.push(newShip)
                break;
            case "down":
                newShip = []
                for (let i = 0; i < shipLength; i++) {
                    newCoord = coordX + "," + (coordY - i)
                    newShip.push(newCoord)
                }
                placedShips.push(newShip)
                break;
        }
        
    };
    console.log(placedShips)
    //show ships on display
    let shipIndex = 0
    for (let ship of placedShips) {
        var newShipDisplay = document.createElement("li")
        let shipName
        console.log(ship.length)
        var shipLength = ship.length
        switch(shipLength) {
            case 2:
                shipName = "Destroyer"
                break;
            case 3:
                shipName = "Submarine"
                break;
            case 4:
                shipName = "Battleship"
                break;
            case 5:
                shipName = "Aircraft Carrier"
                break;
        }
        shipIndex += 1
        var shipText = document.createTextNode(shipName + " (" + ship.length + " blocks long)")
        newShipDisplay.appendChild(shipText)
        newShipDisplay.setAttribute("id", "ship-" + shipIndex)
        document.getElementById("ships-remaining-list").appendChild(newShipDisplay)
        document.getElementById("miss-counter").innerHTML = misses
    }
}

function generateBoard(amountOfRowCol) {
    amountOfRowCol = 8
    BOARD.style.backgroundColor = "gray";

    squareWidth = (BOARD.clientWidth - 20) / amountOfRowCol
    BOARD.style.height = squareWidth + "px"

    for (let i = amountOfRowCol; i > 0; i--) {
        const newRow = document.createElement("div")
        newRow.setAttribute('class', 'row g-0')
        newRow.style.height = squareWidth + "px"
        newRow.style.width = "100%"
        BOARD.appendChild(newRow)

        for (let j = 1; j <= amountOfRowCol; j++) {
            const newSquare = document.createElement("div")
            newSquare.style.height = (squareWidth)  + "px"
            newSquare.style.width = (squareWidth) + "px"
            newSquare.setAttribute('class', 'board-square')
            newSquare.setAttribute('id', j.toString() + "," + i.toString())
            newSquare.setAttribute('onClick', "selectSquare(this)")
            newRow.appendChild(newSquare);
        }
    }
    placeShips(amountOfRowCol, ships)
}

function showDifficultyOptions() {
    for (let diff in difficultyOptions) {
        const newButton = document.createElement("button")
        newButton.setAttribute('class', 'btn btn-success difficulty-button')
        newButton.textContent = difficultyOptions[diff];
        newButton.setAttribute('id', difficultyOptions[diff].toLowerCase())
        newButton.addEventListener("click", selectDifficulty, true)
        BOARD.appendChild(newButton)
    }
}

function selectDifficulty() {
    BOARD.innerHTML = ""
    difficultySelection = this.id
    switch (difficultySelection) {
        case "easy":
            ships = [3, 4, 4, 5, 5];
            generateBoard();
            break;
        case "medium":
            ships = [3, 4, 4, 5];
            generateBoard();
            break;
        case "hard":
            ships = [2, 3, 4];
            generateBoard();
            break;
    }
}

window.onload = function() {
    showDifficultyOptions()
}