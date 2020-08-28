//  set-up a grid
// add shooter

function init() {

  // * DOM ELEMENTS
  const grid = document.querySelector('.grid')

  // * GRID VARIABLES
  const width = 10
  const cellCount = width * width
  const cells = []

  // * GAME VARIABLES
  let shooterPosition = 94
  const aliens = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24,25, 26, 27]

  // * EXECUTION
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
  
  function moveShooter(event) {
    removeShooter(shooterPosition)
    
    const x = shooterPosition % width
    const y = null
    
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) shooterPosition++
        break
      case 37: 
        if (x > 0) shooterPosition--
        break
      case 32: 
        if (x > 0) shooterPosition--
        break
      default:
        console.log('invalid key')
    }
    addShooter(shooterPosition)
  }

  // * EVENTS
  makeGrid()
  addShooter()
  addAliens()

  document.addEventListener('keydown', moveShooter)
    
}
window.addEventListener('DOMContentLoaded', init)