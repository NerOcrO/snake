'use strict'

import $, * as utils from './utils'
import load from './configuration'

const highScore = $('#highScore')
const score = $('#score')
const scoreValue = score.innerHTML
let scoreSpan = Number(score.querySelector('span').innerHTML)
const timer = $('#timer')
const backgroundColor = $('#backgroundColor').value
const gridColor = $('#gridColor').value
const snakeColor = $('#snakeColor').value
const appleColor = $('#appleColor').value
const squareSize = $('#squareSize').value
const marginSize = $('#marginSize').value
const tailSize = $('#tailSize').value
const speed = $('#speed').value
const context = $('canvas').getContext('2d')
const squarePow = squareSize ** 2
const trail = []
const randomPlace = () => Math.floor(Math.random() * squareSize)

let appleX = randomPlace()
let appleY = randomPlace()
let snakeX = squareSize / 2
let snakeY = squareSize / 2
let tail = tailSize
let isPaused = false
let isLaunched = false
let oldDirection = ''
let newDirection = ''
let initDate = 0
let pauseDate = 0
let cumuldiffPause = 0

const createBackground = () => {
  context.fillStyle = backgroundColor
  context.fillRect(0, 0, squarePow, squarePow)
}

const createGrid = () => {
  context.fillStyle = gridColor

  for (let counter = 0; counter <= squareSize; counter++) {
    context.fillRect(squareSize * counter - marginSize, 0, marginSize, squarePow)
    context.fillRect(0, squareSize * counter - marginSize, squarePow, marginSize)
  }
}

const createSnake = () => {
  if (newDirection === 'ArrowLeft') {
    snakeX += -1
  }
  else if (newDirection === 'ArrowRight') {
    snakeX += 1
  }
  else if (newDirection === 'ArrowUp') {
    snakeY += -1
  }
  else if (newDirection === 'ArrowDown') {
    snakeY += 1
  }

  oldDirection = newDirection

  // Walkthrough the wall.
  if (snakeX < 0) {
    snakeX = squareSize - 1
  }
  else if (snakeX > squareSize - 1) {
    snakeX = 0
  }
  else if (snakeY < 0) {
    snakeY = squareSize - 1
  }
  else if (snakeY > squareSize - 1) {
    snakeY = 0
  }

  context.fillStyle = snakeColor

  trail.forEach((element) => {
    context.fillRect(element.x * squareSize, element.y * squareSize, squareSize - marginSize, squareSize - marginSize)

    // S'il se mord la queue, on recommence au début.
    if (element.x === snakeX && element.y === snakeY) {
      utils.setHighScore(scoreSpan)
      highScore.innerHTML = utils.fillHighScore()
      scoreSpan = 0

      tail = tailSize
      score.innerHTML = scoreValue
      initDate = utils.getNow()
      cumuldiffPause = 0
    }
  })

  trail.push({ x: snakeX, y: snakeY })

  while (trail.length > tail) {
    trail.shift()
  }
}

const createApple = () => {
  // The snake eats the apple.
  if (appleX === snakeX && appleY === snakeY) {
    // The tail grows up.
    tail += 1
    // Update the score.
    scoreSpan += 1
    score.innerHTML = utils.makingOfScore(scoreSpan)

    // Apple respawn with the new coordinates.
    appleX = randomPlace()
    appleY = randomPlace()
  }

  context.fillStyle = appleColor
  context.fillRect(appleX * squareSize, appleY * squareSize, squareSize - marginSize, squareSize - marginSize)
}

const game = () => {
  if (isPaused) {
    const text = 'Pause'

    context.fillStyle = '#fff'
    context.font = `bold ${squareSize * 2}px eightiesFont`
    context.textBaseline = 'middle'
    context.fillText(text, (squarePow / 2) - (context.measureText(text).width / 2), (squarePow / 2))
  }
  else {
    createBackground()
    createGrid()
    createSnake()
    createApple()

    if (isLaunched || isPaused) {
      timer.innerHTML = utils.setTimer(utils.getNow().getTime(), initDate.getTime(), cumuldiffPause)
    }
  }
}

const isGameLaunched = () => {
  if (!isLaunched) {
    isLaunched = !isLaunched
    initDate = utils.getNow()
  }
}

const keyDown = (event) => {
  if (!isPaused) {
    if (event.code === 'ArrowLeft' && oldDirection !== 'ArrowRight') {
      newDirection = event.code
      isGameLaunched()
    }
    else if (event.code === 'ArrowRight' && oldDirection !== 'ArrowLeft') {
      newDirection = event.code
      isGameLaunched()
    }
    else if (event.code === 'ArrowUp' && oldDirection !== 'ArrowDown') {
      newDirection = event.code
      isGameLaunched()
    }
    else if (event.code === 'ArrowDown' && oldDirection !== 'ArrowUp') {
      newDirection = event.code
      isGameLaunched()
    }
  }

  if (event.code === 'Space') {
    isPaused = !isPaused

    if (isPaused) {
      pauseDate = utils.getNow()
    }
    else {
      cumuldiffPause += Math.floor((utils.getNow().getTime() - pauseDate.getTime()) / 1000)
    }
  }
}

window.addEventListener('keydown', keyDown)
window.addEventListener('load', load)
setInterval(game, speed)
