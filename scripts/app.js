function init() {
  // * DOM ELEMENTS
  const grid = document.querySelector('.grid')

  // * GRID VARIABLES
  const width = 10
  const height = 15
  const cellCount = width * height
  const cells = []
  
  // * GAME VARIABLES
  let shooterPosition = 144
  let aliens = [0, 1, 2, 3, 4, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24]
  const startBtn = document.querySelector('.start') // * move this to the top with your other variables
  let alienTimer
  let lazerPosition
  let laserTimer
  
  // * EXECUTION
  function makeGrid() { 
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.setAttribute('id', i) 
      cell.textContent = i //remove this later
    }  
    return
  }
  function addShooter() {
    cells[shooterPosition].classList.add('shooter')
  }
  function removeShooter() {
    cells[shooterPosition].classList.remove('shooter')
  }
  function moveShooter(event) {
    removeShooter(shooterPosition)
    const x = shooterPosition % width

    switch (event.keyCode) {
      case 39: // RIGHT
        if (x < width - 1) shooterPosition++
        break
      case 37: // LEFT
        if (x > 0) shooterPosition--
        break
      case 32: // space bar to shoot
        shootLazer()
        break
      default:
        console.log('invalid key to move shooter')
    }
    addShooter(shooterPosition)
    console.log(shooterPosition)
  }

  function addAliens() {
    aliens.forEach((alien, i) => {
      cells[alien].classList.add('alien')
    })
  }
  function removeAliens() {
    aliens.forEach((alien, i) => {
      cells[alien].classList.remove('alien')
    })
  }

  // when the function moveAliens is called
  // aliens will move +1 cell 
  // when arrays reach the border of the grid +10 cells to aliens array
  // move aliens -1
  // when arrays reach the border of the grid +10 cells to aliens array
  // loop back to the start of function
  // stop function when aliens reach cell #129 (this should run endGame())

  function moveAliens() {
    let count = 0

  
    alienTimer = setInterval(() => {
      removeAliens()
      aliens = aliens.map(alien => {
        return alien + 1
      })
      addAliens()
    }, 100); 
  } 

  function startGame() {
    moveAliens()
  }

  function addLazer() {
    cells[lazerPosition].classList.add('laser')
  }

  function removeLazer() {
    cells[lazerPosition].classList.remove('laser')
  }
  
  function shootLazer() {
    let laserCount = 0
    lazerPosition = shooterPosition
    laserTimer = setInterval(() => {
      removeLazer()
      lazerPosition = lazerPosition - 10
      addLazer()
    }, 500);
  }

  //this function will need to the end game if the aliens reach the cell #129 
  function endGame() {
    if (aliens === ) { //
      console.log('the game needs to end')
    } else {
      return
    }
  }


  // * EVENTS
  makeGrid()
  addShooter()
  addAliens()
  endGame()
  document.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
}
window.addEventListener('DOMContentLoaded', init)