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
  let aliens = [0, 1, 2, 3, 4, 5, 10, 11, 12, 13 ,14, 15, 20, 21, 22, 23, 24, 25]
  const startBtn = document.querySelector('.start') // * move this to the top with your other variables
  let alienTimer
  
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
  function removeAliens(alien) {
    aliens.forEach((alien, i) => {
      cells[alien].classList.remove('alien')
    })
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
        console.log('invalid key')
    }
    addShooter(shooterPosition)
  }

  function moveAliens() {
    
    removeAliens()
    aliens = aliens.map(alien => {
      return alien + 1
    })
    addAliens()
  }

  function startGame() {
    moveAliens()
  }



  // when the button is clicked by user

  // write a separate function called move aliens and call it here

  // for each item in the array called aliens

  // aliens.forEach((alien, i) => { // * use a map instead and set the result of the map to be the new aliens array

  // * eg. aliens = aliens.map( etc etc ), so we are always keeping track of the alien position

  // * inside the map just add 1 to each iteration to increase the index

  // * before the map call remove aliens

  // * after the map call add aliens

  // * wrap everything in a timer
  
  

  // * EVENTS
  makeGrid()
  addShooter()
  addAliens()
  document.addEventListener('keydown', moveShooter)
  document.addEventListener('click', startGame)
}
window.addEventListener('DOMContentLoaded', init)