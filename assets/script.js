BOARD = document.getElementById('board');

function selectSquare(element) {
    element.style.backgroundColor = "orange"
    console.log(element.id)
}

function generate_board () {
    amountOfRowCol = 10
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