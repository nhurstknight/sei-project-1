function init() {
  // * DOM ELEMENTS
  const grid = document.querySelector('.grid')
  // * GRID VARIABLES
  const width = 10
  const height = 15
  const cellCount = width * height
  const cells = []
  // * GAME VARIABLES
  const startBtn = document.querySelector('.start')
  const playerScore = document.querySelector('.player-score')
  const audio = document.querySelector('.sound')
  let currentScore = 0
  let shooterPosition = 144
  let aliens = [
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
    { currentIndex: 44, isAlive: true },
    { currentIndex: 50, isAlive: true },
    { currentIndex: 51, isAlive: true },
    { currentIndex: 52, isAlive: true },
    { currentIndex: 53, isAlive: true },
    { currentIndex: 54, isAlive: true },
    { currentIndex: 60, isAlive: true },
    { currentIndex: 61, isAlive: true },
    { currentIndex: 62, isAlive: true },
    { currentIndex: 63, isAlive: true },
    { currentIndex: 64, isAlive: true }
  ]
  let alienTimer
  let movingRight = true
  
  let ufoPosition = 9
  let ufoCounter = 0
  let ufoTimer
  
  let laserPosition
  let laserTimer
  
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

  // Aliens functions
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
    if (finalAlienIndex >= 120) {
      window.alert(`Game over. You Lose! Final score: ${currentScore}`)
      clearInterval(alienTimer)
    } else if ((x === width - 1 && movingRight) || (x === 0  && !movingRight)) { 
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

  function addUfo() {
    cells[ufoPosition].classList.add('ufo')
  }
  function removeUfo() {
    cells[ufoPosition].classList.remove('ufo')
  }

  function moveUfo() {
    ufoTimer = setInterval(() => {
      ufoCounter++
      if (ufoCounter < 100) {
        removeUfo()
        ufoPosition = ufoPosition - 1
        addUfo()
      }
    }, 300)
    console.log(ufoTimer)
  }


  // Laser functions
  function addLaser() {
    if (cells[laserPosition].classList.contains('alien')) {
      const hitAlien = aliens.find(alien => alien.currentIndex === laserPosition)
      aliens = aliens.filter(alien => alien.isAlive !== false)
      hitAlien.isAlive = !hitAlien.isAlive
      cells[laserPosition].classList.remove('alien')    
      clearInterval(laserTimer)
      score()
      return
    } else if (laserPosition <= 9 ){
      cells[laserPosition].classList.remove('laser')
      clearInterval(laserTimer)
      console.log('lazer stops')
    }
    cells[laserPosition].classList.add('laser')
  }

  function removeLaser() {
    cells[laserPosition].classList.remove('laser')
  }
  function shootLaser() {
    audio.src = '../sounds/laser1.wav'
    audio.play()
    clearInterval(laserTimer)
    // const laserCount = 0
    laserPosition = shooterPosition
    laserTimer = setInterval(() => {
      removeLaser()
      laserPosition = laserPosition - 10
      addLaser()
    }, 50) 
  } 

  // Game functions
  function startGame() {
    clearInterval(alienTimer)
    alienTimer = setInterval(() => {
      removeAliens()
      moveAliens()
      addAliens()
    }, 300)
    // clearInterval(ufoTimer)
    // ufoTimer = setInterval(() => {

    // })
  }
  function score() {
    currentScore = currentScore + 10
    playerScore.textContent = currentScore
    endGame()
  }
  function endGame() {
    // clear score
    // reset timers
    // reset aliens
    // reset shooterPosition
    if (currentScore < 250) {
      console.log('keep playing')
    } else if (currentScore === 250) {
      window.alert(`Player wins! Final score: ${currentScore}`)
      clearInterval(alienTimer)
    } 
  }

  // * EVENTS   
  makeGrid()
  addShooter()
  addAliens()
  
  startBtn.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
}
window.addEventListener('DOMContentLoaded', init)