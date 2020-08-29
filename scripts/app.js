//  set-up a grid
// add shooter

function init() {

  // * DOM ELEMENTS
  const grid = document.querySelector('.grid')
  
  // * GRID VARIABLES
  const width = 15
  const height = 10
  const cellCount = width * height
  const cells = []
  
  // * GAME VARIABLES
  let shooterPosition = 144
  let aliens = [0, 1, 2, 3, 4, 5, 10, 11, 12, 13 ,14, 15, 20, 21, 22, 23, 24, 25, 26, 75, 63, 72]
  
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
  
  
  function addAliens(alien) {
    aliens.forEach((alien, i) => {
      cells[alien].classList.add('alien')
    })
  }
  
  function moveShooter(event) {
    removeShooter(shooterPosition)
    
    const x = shooterPosition % width
    const y = null // you might need this for the lazer beams, or does this live in another place?
    
    switch (event.keyCode) {
      case 39: // RIGHT
        if (x < width - 1) shooterPosition++
        break
      case 37: // LEFT
        if (x > 0) shooterPosition--
        break
      default:
        console.log('invalid key')
    }
    addShooter(shooterPosition)
  }
      
  function startGame() {
    const startBtn = document.querySelector('.start')
    // define the 'axis' that they are moving across
    const skyline = aliens % width
        
    // write a for loop to run through the array of aliens
    aliens.forEach((alien, i) => {
      if (skyline > width + 1) {
        aliens = aliens++
      } else {
        console.log('no more moves')
      }
    })
  

  }

  // * EVENTS
  makeGrid()
  addShooter()
  addAliens()
  
  document.addEventListener('keydown', moveShooter)
  
  document.addEventListener('click', startGame)
}
window.addEventListener('DOMContentLoaded', init)