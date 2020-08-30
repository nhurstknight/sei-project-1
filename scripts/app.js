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


  //   timerId = setInterval(() => {
  //     removeAliens()
  //     if (count >= 9) {
  //       aliens = aliens.map(alien => {
  //         return alien + 1
  //       }) else if (count = 10) {
  //         aliens = aliens.map(alien => {
  //           return alien + 10
  //         }) else if (count <= 19) {
  //           aliens = aliens.map(alien => {
  //           return alien - 1
  //         })
  //     })
  //     addAliens()
  //   }, 2000);
  // }

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