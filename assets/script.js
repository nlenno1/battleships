BOARD = document.getElementById('board');

function generate_board () {
    amountOfRowCol = 5
    BOARD.style.backgroundColor = "gray";

    squareWidth = BOARD.clientWidth / amountOfRowCol
    BOARD.style.height = squareWidth + "px"
    console.log(squareWidth)
    console.log(squareWidth*amountOfRowCol)

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
            newSquare.setAttribute('id', j + "-" + i )
            newRow.appendChild(newSquare);
        }
    }
}

window.onload = function() {
    generate_board()
}