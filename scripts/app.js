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
    { currentIndex: 11, isAlive: true },
    { currentIndex: 10, isAlive: true },
    { currentIndex: 12, isAlive: true },
    { currentIndex: 13, isAlive: true },
    { currentIndex: 14, isAlive: true },
    { currentIndex: 20, isAlive: true },
    { currentIndex: 21, isAlive: true },
    { currentIndex: 22, isAlive: true },
    { currentIndex: 23, isAlive: true },
    { currentIndex: 24, isAlive: true },
    { currentIndex: 30, isAlive: true },
    { currentIndex: 31, isAlive: true },
    { currentIndex: 32, isAlive: true },
    { currentIndex: 33, isAlive: true },
    { currentIndex: 34, isAlive: true },
    { currentIndex: 40, isAlive: true },
    { currentIndex: 41, isAlive: true },
    { currentIndex: 42, isAlive: true },
    { currentIndex: 43, isAlive: true },
    { currentIndex: 44, isAlive: true }
  ]
  const startBtn = document.querySelector('.start')
  let alienTimer
  let movingRight = true
  let lazerPosition
  let lazerTimer
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
    const finalVirusIndex = movingRight ? aliens[aliens.length - 1].currentIndex : aliens[0].currentIndex
    const x = finalVirusIndex % width 
    if ((x === width - 1 && movingRight) || (x === 0  && !movingRight)) { 
      aliens = aliens.map(alien => {
        return {
          ...alien, currentIndex: alien.currentIndex + width
        }
      })
      movingRight = !movingRight
    } else if (movingRight) {
      aliens = aliens.map(alien => {
        return {
          ...alien, currentIndex: alien.currentIndex + 1
        }
      })
    } else if (!movingRight) { 
      aliens = aliens.map(alien => {
        return {
          ...alien, currentIndex: alien.currentIndex - 1
        }
      })
    } 
  }
  function startGame() {
    clearInterval(alienTimer)
    alienTimer = setInterval(() => {
      removeAliens()
      moveAliens()
      addAliens()
    },1000)
  }
  function addLazer() {
    if (cells[lazerPosition].classList.contains('alien')) {
      const hitAlien = aliens.find(alien => alien.currentIndex === lazerPosition)
      hitAlien.isAlive = !hitAlien.isAlive
      clearInterval(lazerTimer)
    }
    cells[lazerPosition].classList.add('laser')

  }
  function removeLazer() {
    cells[lazerPosition].classList.remove('laser') 
  }
  function shootLazer() {
    clearInterval(lazerTimer)
    const laserCount = 0
    lazerPosition = shooterPosition
    lazerTimer = setInterval(() => {
      removeLazer()
      lazerPosition = lazerPosition - 10
      addLazer()
    }, 500) 
  }  
  

      
      

  // * EVENTS
  makeGrid()
  addShooter()
  addAliens()
  document.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
}
window.addEventListener('DOMContentLoaded', init)