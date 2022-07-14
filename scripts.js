const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessage = document.querySelector('[data-winning-message]')
const restartButton = document.querySelector('[data-restart-button]')

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8]
]

const startGame = () => {
    isCircleTurn = false;
    
    for (const cell of cellElements) {
        cell.classList.remove('circle')
        cell.classList.remove('x')
        cell.addEventListener('click', handleClick, {once: true}); 
    }
    
    setBoardHoverClass();
    winningMessage.classList.remove('show-winning-message');
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = 'Empate!'
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? '◯ Venceu!' : 'X Venceu!'
    }

    winningMessage.classList.add('show-winning-message')
}

const checkForWin = (currentPlayer) => {

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        })

    })
}

const checkForDraw = () => {
    return [... cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();

}

const setBoardHoverClass = () => {
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn) {
        board.classList.add('circle')
    } else {
        board.classList.add('x')
    }
}

const handleClick = (e) => {
    
    //colocar a marca (x ou circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn  ? 'circle' : 'x';

    placeMark(cell, classToAdd); 
    
   
    //verificar por vitoria

    const winner = checkForWin(classToAdd);
    
    //verificar por empate

    const isDraw = checkForDraw();

    if (winner) {
        endGame(false);
    } else if (isDraw) {
        endGame(true)
    } else {
        
        //mudar o simbolo
        
        swapTurns();
    }
};

startGame();

restartButton.addEventListener('click', startGame);