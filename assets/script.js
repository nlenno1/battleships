const BOARD = document.getElementById('board');
var placedShips = []
var selectedSquares = []
var misses = 0
var totalShipsSunk = 0
var ships = [3, 4, 4, 5];

function selectSquare(element) {
    if (selectedSquares.includes(element.id)) {
        alert("You have already picked that one")
    } else {
        selectedSquares.push(element.id)

        let hit = false
        var counter = 0
        var shipIndex = 0
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
                alert("HIT and sunk ship " + shipIndex)
                totalShipsSunk += 1
                document.getElementById("ship-" + shipIndex).style.color = "red"
            } else {
                alert("HIT")
            }
            element.style.backgroundColor = "red"
        }
        if (totalShipsSunk == placedShips.length) {
            alert("CONGRATULATIONS YOU HAVE WON. You had " + misses + " misses. Try again and see if you can get fewer!")
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
        shipIndex += 1
        var newShipDisplay = document.createElement("li")
        var shipText = document.createTextNode("Ship " + shipIndex + " (" + ship.length + " blocks long)")
        newShipDisplay.appendChild(shipText)
        newShipDisplay.setAttribute("id", "ship-" + shipIndex)
        document.getElementById("ships-remaining-list").appendChild(newShipDisplay)
        document.getElementById("miss-counter").innerHTML = misses
    }
}

function generate_board(amountOfRowCol) {
    amountOfRowCol = 8
    BOARD.style.backgroundColor = "gray";

    squareWidth = BOARD.clientWidth / amountOfRowCol
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

    // squares = document.getElementsByClassName('board-square');
    // console.log(squares)
    // for (let square of squares) {
    //     document.addEventListener('click', function() {
    //         console.log(square.getAttribute('id'))
    //         document.getElementById(square.getAttribute('id')).style.backgroundColor = "orange"
    //     });
    // }

}

window.onload = function() {
    generate_board()
}