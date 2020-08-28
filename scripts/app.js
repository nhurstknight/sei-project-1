//  set-up a grid
// add shooter
// 



function init() {

  // * DOM ELEMENTS
  const grid = document.querySelector('.grid')

  // * GRID 
  const width = 15
  const height = 10
  const cellCount = width * height
  const cells = []

  let shooterPosition = 142
  const alienArmy = []
  let alienArmyPosition = 0


  // * EXECUTION
  function addShooter() {
    cells[shooterPosition].classList.add('shooter')
  }

  function removeShooter() {
    cells[shooterPosition].classList.remove('shooter')
  }

  function addAlienArmy() {
    cells[shooterPosition].classList.add('alien-army')
  }

  function removeAlienArmy() {
    cells[shooterPosition].classList.remove('alien-army')
  }



  function makeGrid() { 
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.setAttribute('id', i) 
      cell.textContent = i //remove this later
    }
    addShooter()
    addAlienArmy()
  }

  function moveShooter(event) {
    removeShooter(shooterPosition)

    const x = shooterPosition % width
    
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) shooterPosition++
        break
      case 37: 
        if (x > 0) shooterPosition--
        break
      default:
        console.log('no more moves')
    }
    addShooter(shooterPosition)
  }

  function alienArmyDescends() {

  }


  // * EVENTS
  makeGrid()
  document.addEventListener('keydown', moveShooter)
  addAlienArmy()



}
window.addEventListener('DOMContentLoaded', init)