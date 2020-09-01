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
  let lazerPosition = []
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

  // stop when aliens get to 9, 19, 29 +10 and -1 to move left
  // stop when aliens get to 1, 11, 21 +10 and +1 to move right
  function moveAliens() {
    let timerId = null
    let count = 0

    timerId = setInterval(() => {
      removeAliens()
      aliens = aliens.map(alien => {
        return alien + 1
      })
      addAliens()
    }, 2000);
  }

  function startGame() {
    moveAliens()
  }

  function addLazer() {
    lazerPosition.forEach((lazer, i) => {
      cells[lazer].classList.add('laser')
    })
  }

  function removeLazer() {
    lazerPosition.forEach((lazer, i) => {
      cells[lazer].classList.remove('laser')
    })
  }
  
  function moveLazer() {
    let laserTimerId = null 
    let laserCount = 0

    laserTimerId = setInterval(() => {
      removeLazer()
      lazerPosition.map(lazer => {
        
      })
      
    }, 1000);
    
    //   laserTimerId = setInterval(() => {
    //     removeLazer()
    //     lazerPosition.map(lazer => {
    //       return lazer - 10
    //     })
    //   }, 1000);

  }

  function shootLazer(event){
    switch (event.keyCode) {
      case 32: // space bar to shoot
        lazerPosition.push(shooterPosition - 10)
        addLazer()
        moveLazer()
        break
      default:
        console.log('NO BUENO')
    }
  }


  // * EVENTS
  makeGrid()
  addShooter()
  addAliens()
  document.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
  document.addEventListener('keydown', shootLazer)
}
window.addEventListener('DOMContentLoaded', init)