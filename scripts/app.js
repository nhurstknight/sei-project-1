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
  let aliens = [
    { currentIndex: 0, isAlive: true },
    { currentIndex: 1, isAlive: true },
    { currentIndex: 2, isAlive: true },
    { currentIndex: 3, isAlive: true },
    { currentIndex: 4, isAlive: true },
    { currentIndex: 10, isAlive: true },
    { currentIndex: 11, isAlive: true },
    { currentIndex: 12, isAlive: true },
    { currentIndex: 13, isAlive: true },
    { currentIndex: 14, isAlive: true },
    { currentIndex: 20, isAlive: true },
    { currentIndex: 21, isAlive: true },
    { currentIndex: 22, isAlive: true },
    { currentIndex: 23, isAlive: true },
    { currentIndex: 24, isAlive: true }
  ]
  const startBtn = document.querySelector('.start')
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
  }
  function addAliens() {
    aliens.forEach((alien) => {
      if (alien.isAlive)
        cells[alien.currentIndex].classList.add('alien')
    })
  }
  function removeAliens() {
    aliens.forEach((alien) => {
      cells[alien.currentIndex].classList.remove('alien')
    })
  }
  function moveAliens() {
    // * tracking position of final alien in array
    const finalAlien = aliens[aliens.length - 1].currentIndex
    // * check if final alien is at the edge of the grid, if its 9 its the end of grid
    const x = finalAlien % width
    // * check which row we are on so we can track if we are at the bottom of the grid later
    const y = Math.floor(finalAlien / width)
    // * if current position of final alien is less than 9 && y is even (moving right), keep moving
    if (x < width - 1 && y % 2 === 0) {
      aliens = aliens.map(alien => {
        //* for each alien spread in current object and add 1 to the index
        return { ...alien, currentIndex: alien.currentIndex + 1 }
      })
      // * switch direction to right
    } else if (x > aliens.length - 1 && y % 2 !== 0) {
      aliens = aliens.map(alien => {
        return { ...alien, currentIndex: alien.currentIndex - 1 }
      })
      // * switch direction to left
    } else if (x === width - 1 || x === aliens.length - 1) {
      aliens = aliens.map(alien => {
        return { ...alien, currentIndex: alien.currentIndex + width }
      })
    } 
  }
  function startGame() {
    alienTimer = setInterval(() => {
      removeAliens()
      moveAliens()
      addAliens()
    },1000)
  }
  function addLazer() {
    cells[lazerPosition].classList.add('laser')
  }
  function removeLazer() {
    cells[lazerPosition].classList.remove('laser')
  }
  function shootLazer() {
    const laserCount = 0
    lazerPosition = shooterPosition
    laserTimer = setInterval(() => {
      removeLazer()
      lazerPosition = lazerPosition - 10
      addLazer()
    }, 500)
  }
  //this function will need to the end game if the aliens reach the cell #129 
  // function endGame() {

  // }

  // * EVENTS
  makeGrid()
  addShooter()
  addAliens()
  // endGame()
  document.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
}
window.addEventListener('DOMContentLoaded', init)