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
  const startPopUp = document.querySelector('.start-pop-up')
  const endPopUp = document.querySelector('.end-pop-up')
  
  let currentScore = 0
  let shooterPosition = 144
  let aliens = [
    { currentIndex: 10, isAlive: true },
    { currentIndex: 11, isAlive: true },
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
    { currentIndex: 44, isAlive: true },
    { currentIndex: 50, isAlive: true },
    { currentIndex: 51, isAlive: true },
    { currentIndex: 52, isAlive: true },
    { currentIndex: 53, isAlive: true },
    { currentIndex: 54, isAlive: true },
  ]
  let alienTimer
  let movingRight = true
  
  let ufoPosition = 9
  let ufoTimer
  let ufoCount = 0
  
  let laserPosition
  let laserTimer
  
  // * EXECUTION *
  // Grid
  function makeGrid() { 
    for (let i = 0; i < cellCount; i++) { 
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.setAttribute('id', i) 
      // cell.textContent = i //remove this later
      setTimeout(() => {
      }, 5000)
    }  
    return
  }

  // Shooter
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

  // Aliens
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
    if (finalAlienIndex >= 139) {
      gameOver()
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

  // UFO
  function addUfo() {
    cells[ufoPosition].classList.add('ufo')
  }
  function removeUfo() {
    cells[ufoPosition].classList.remove('ufo')
  }
  function moveUfo() {
    // audio.src = '../sounds/ufo2.wav'
    // audio.play()
    ufoTimer = setInterval(() => {
      if (ufoCount < 10) {
        ufoCount++
        removeUfo()
        ufoPosition = ufoPosition - 1
        addUfo()
      } else if (ufoCount === 10 ) {
        clearInterval(ufoTimer)
        moveUfo()
      }
    }, 50)
  }
  function loopUfo() {
    clearInterval(loopUfo)
    removeUfo()
    setInterval(() => {  
      moveUfo()
    }, 6000) 
  }
    

  // Laser
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
    // const laserCount = 0 //does this have a purpose?
    laserPosition = shooterPosition
    laserTimer = setInterval(() => {
      removeLaser()
      laserPosition = laserPosition - 10
      addLaser()
    }, 50) 
  } 

  // Game
  function startGame() {
    clearInterval(alienTimer)
    alienTimer = setInterval(() => {
      removeAliens()
      moveAliens()
      addAliens()
    }, 500)
    moveUfo()
    
  }
  function score() {
    currentScore = currentScore + 10
    playerScore.textContent = currentScore
    winGame()
  }
  function winGame() {
    if (currentScore === 250) {
      // audio.src = ''
      // audio.play()
      window.alert(`Player wins! Final score: ${currentScore}`)
      endPopUp.textContent = `Player wins! Final score: ${currentScore}`
      clearInterval(alienTimer)
    } 
  }
  function gameOver() {
    // audio.src = ''
    // audio.play()
    window.alert(`Game over. You Lose! Final score: ${currentScore}`)
    endPopUp.textContent = `Game over. You Lose! Final score: ${currentScore}`
    console.log(endPopUp)
  }

  // * EVENTS   
  makeGrid()
  addShooter()
  addAliens()
  startBtn.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
}
window.addEventListener('DOMContentLoaded', init)