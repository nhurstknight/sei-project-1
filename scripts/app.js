function init() {

  // * ELEMENTS
  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []

  console.log('these are the cells', cells)


  // * EXECUTION

  function makeGrid() { 
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      console.log(cell)
      cell.setAttribute('id', i)
      cells.push(cell)
      grid.appendChild(cell)
    }
  }




  // * EVENTS

  makeGrid()



}
window.addEventListener('DOMContentLoaded', init)