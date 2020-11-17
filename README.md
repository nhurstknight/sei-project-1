# SEI-project-1 - Space Invaders

The deployed game can be found [here](https://nhurstknight.github.io/space-invaders/).

## Brief

The brief for this game was to build a single page grid based game using JavaScript(ES6), CSS3 and HTML5. We were given a choice of classic arcade games to recreate and I chose to make Space Invaders, one of the most popular games ever created.

The technical requirements were as follows:
- Render a game in the browser
- Design win logic and display the game result
- Include separate HTML / CSS / JavaScript files
- Use semantic markup for HTML and CSS
- UseJavascript for DOM manipulation
- Deploy the finished game online

This was a solo project and we were given 8 days to complete the project.

## Technologies 
- Javascript(ES6)
- HTML5
- CSS3
- VSCode
- Eslint
- Git
- GitHub
- Google Fonts

## Game Overview & Instructions
Space Invaders is a classic arcade game which was first released in 1978. 

The player must defeat and descending alien invasion by firing a laser cannon which moves horizontally across the bottom of the screen. 

### Instructions
- **Laser cannon movement:** ← → keys
- **Shoot laser:** Space bar
- **Start game:** Start game button 
- **Play again/restart:** Play again button

### Scoring
- Each alien is worth 10 points.
- To win the game the player must hit all 25 aliens. 
- The game ends if the aliens reach the Earth surface.

## Process
I spent time planning the project, breaking tasks into smaller chunks.

## Wins & challenges
### Wins
* The biggest win for me was being able to implement the various components of the game as I did not have much experience writing in JavaScript prior to starting at GA.

### Challenges
One of the biggest challenges was the alien movement within the grid.  I initially wrote a function for this and it worked, however, it was reliant on the alien position increasing by +1 on the grid. This meant that the aliens were not moving from between the horizontal boundaries of the grid as expected in traditional Space Invaders. I was able to refactor the code to overcome this, however it has created another bug as the movement is calculated by the position of the last alien in the array. This is a bug I would like to resolve once I complete the course. 

```
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
- The player can fire multiple lasers which means that lasers are caught on the grid
- The UFO only passes through the game once, this should be on a timed interval

## Future features
- Allow aliens to fire at the player
- Add player life count and defence barriers
- Count of remaining aliens to hit
- Extra points for firing at the UFO
- Increase the speed of the last alien on the grid
- Add multiple levels with increasing level of difficultly
- High score board functionality using local storage
---
