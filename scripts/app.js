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
  const playerScore = document.querySelector('.player-score')
  let alienTimer
  let movingRight = true
  let laserPosition
  let laserTimer
  let currentScore = 0
  
  // * EXECUTION
  function makeGrid() { 
    for (let i = 0; i < cellCount; i++) { 
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.setAttribute('id', i) 
      // cell.textContent = i //remove this later
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
        shootLaser()
        startGame()
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
    const finalAlienIndex = movingRight ? aliens[aliens.length - 1].currentIndex : aliens[0].currentIndex
    const x = finalAlienIndex % width 
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
  function addLaser() {
    if (cells[laserPosition].classList.contains('alien')) {
      const hitAlien = aliens.find(alien => alien.currentIndex === laserPosition)
      hitAlien.isAlive = !hitAlien.isAlive
      clearInterval(laserTimer)
      score()
      return
    }
    cells[laserPosition].classList.add('laser')
    
  }
  function removeLaser() {
    cells[laserPosition].classList.remove('laser') 
  }
  function shootLaser() {
    clearInterval(laserTimer)
    // const laserCount = 0
    laserPosition = shooterPosition
    laserTimer = setInterval(() => {
      removeLaser()
      laserPosition = laserPosition - 10
      addLaser()
    }, 200) 
  }  
  function score() {
    currentScore = currentScore + 10
    playerScore.textContent = currentScore
  }
  // function endGame() {
  //   // if aliens[aliens.length -1].currentindex || currentScore === 250 || all alien.isAlive === false
  //   // clear score
  //   // reset timers
  //   // reset aliens
  //   // reset shooterPosition
  // }
  
 // * EVENTSgit 
  makeGrid()
  addShooter()
  addAliens()
  // endGame()
  document.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
}
window.addEventListener('DOMContentLoaded', init)