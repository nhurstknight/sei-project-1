# SEI-project-1 - Space Invaders

The deployed game can be found [here](https://nhurstknight.github.io/space-invaders/).

## Brief

The brief for this project was to build a single page grid based game using JavaScript(ES6), CSS3 and HTML5 in 8 days. I chose to recreate the classic game Space Invaders.

The technical requirements were as follows:
- Render a game in the browser.
- Design win logic and display the game result.
- Include separate HTML / CSS / JavaScript files.
- Use semantic markup for HTML and CSS.
- UseJavascript for DOM manipulation.
- Deploy the finished game online.

This was a solo project and we were given 8 days to complete the project.

## Technologies & Tools

**Tech:** HTML5, CSS3, JavaScript

**Tools:** VSCode, Eslint, Git & GitHub

## Overview
Space Invaders is a classic arcade game which was first released in 1978. The player must defeat and descending alien invasion by firing a laser cannon which moves horizontally across the bottom of the screen.

### Instructions & Scoring
- **Laser cannon movement:** ← → keys
- **Shoot laser:** Space bar
- **Start game:** Start game button 
- **Play again/restart:** Play again button

- Each alien is worth 10 points.
- To win the game the player must hit all 25 aliens. 
- The game ends if the aliens reach the Earth surface.

## Process
1. I started the process with the planning phase of my project, this involved listing out the key steps or milestones I needed to achieve and sketching a wireframe for my game.
2. The next step was to set-up my project files and write a function to render the grid.
3. Once the grid was rendered in the browser, I then wrote my code to add the shooter to the grid and manage the player movement on the grid.
4. Following this I wrote the functions that would render the aliens and allow them to move on the grid. 
5. My next step was to write the code to add laser. 
6. I ran into a bug with the alien movement as the original code I wrote meant that the aliens only moved from left to right, however, as per classic Space Invaders I wanted the aliens to move in both directions. I had to refactor the code to resolve this bug.
7. The next step was to write the a function to track the laser position on the grid and manage collision detection with the aliens. 
```js
function addLaser() {
    if (cells[laserPosition].classList.contains('alien')) {
      const hitAlien = aliens.find(alien => alien.currentIndex === laserPosition)
      aliens = aliens.filter(alien => alien.isAlive !== false)
      hitAlien.isAlive = !hitAlien.isAlive
      cells[laserPosition].classList.remove('alien')
      hitAlienSound()
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
    laserSound()
    clearInterval(laserTimer)
    // const laserCount = 0 //does this have a purpose?
    laserPosition = shooterPosition
    laserTimer = setInterval(() => {
      if (laserPosition > 0){
        removeLaser()
        laserPosition = laserPosition - 10
        addLaser()
      }
    }, 50) 
  } 
```
8. After this I wrote the code for win logic and scoring.
9. Finally I then moved onto styling and adding features such as audio.


## Wins & challenges
### Wins
The biggest win for me was being able to implement the various components of the game and have a functioning application by the end of the project. It was great learning curve for me as I had experience of planning a project, breaking large tasks into smaller problems and utilising pseudocode when writing code. 

### Challenges
One of the biggest challenges was the alien movement within the grid. As mentioned I did have to refactor the code to fix one but, however it has created another bug as the movement is calculated by the position of the last alien in the array. Due to time constraints I was not able to resolve the second bug, however, this is something I would like to improve post course.

```js
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
```

## Bugs
I had a few bugs that I was not able to fix in the time constraints of the project:
- The player can fire multiple lasers which means that lasers are caught on the grid.
- The UFO only passes through the game once, this should be on a timed interval.

## Future features
- Allow aliens to fire at the player.
- Add player life count and defence barriers.
- Count of remaining aliens to hit.
- Extra points for firing at the UFO.
- Increase the speed of the last alien on the grid.
- Add multiple levels with increasing level of difficultly.
- High score board functionality using local storage.
