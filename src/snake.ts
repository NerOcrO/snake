import { load } from './configuration'
import { setHighScore, showHighScore, showScore } from './score'
import { showTimer } from './timer'
import { $, randomPlace as randomCoordinate } from './utils'

type Snake = Readonly<{
  x: number
  y: number
}>

const highScoreElement = $('#highScore') as HTMLSpanElement
const scoreElement = $('#score') as HTMLSpanElement
const scoreHtml = scoreElement.innerHTML
const timerElement = $('#timer') as HTMLSpanElement
const backgroundColor = ($('#backgroundColor') as HTMLInputElement).value
const gridColor = ($('#gridColor') as HTMLInputElement).value
const snakeColor = ($('#snakeColor') as HTMLInputElement).value
const appleColor = ($('#appleColor') as HTMLInputElement).value
const squareSize = Number(($('#squareSize') as HTMLInputElement).value)
const marginSize = Number(($('#marginSize') as HTMLInputElement).value)
const tailSizeSnakeInit = Number(($('#tailSizeSnake') as HTMLInputElement).value)
const speed = Number(($('#speed') as HTMLInputElement).value)
const gameField = ($('canvas') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
const gameFieldSize = squareSize * squareSize
const oneSecond = 1000

let appleX = randomCoordinate(squareSize)
let appleY = randomCoordinate(squareSize)
let snakeX = squareSize / 2
let snakeY = squareSize / 2
let tailSizeSnake = tailSizeSnakeInit
let isGamePaused = false
let isGameOver = false
let isGameStarted = false
let oldDirection = ''
let newDirection = ''
let snake: Snake[] = []
let time = 0
let score = 0

let gameInterval: number
let timerInterval: number

const createBackground = () => {
  gameField.fillStyle = backgroundColor
  gameField.fillRect(0, 0, gameFieldSize, gameFieldSize)
}

const createGrid = () => {
  gameField.fillStyle = gridColor
  const column = (counter: number) => gameField.fillRect(squareSize * counter - marginSize, 0, marginSize, gameFieldSize)
  const line = (counter: number) => gameField.fillRect(0, squareSize * counter - marginSize, gameFieldSize, marginSize)

  for (let counter = 0; counter <= squareSize; counter++) {
    column(counter)
    line(counter)
  }
}

const createSnake = () => {
  if (newDirection === 'ArrowLeft') {
    snakeX += -1
  } else if (newDirection === 'ArrowRight') {
    snakeX += 1
  } else if (newDirection === 'ArrowUp') {
    snakeY += -1
  } else if (newDirection === 'ArrowDown') {
    snakeY += 1
  }

  oldDirection = newDirection

  // Walkthrough the wall.
  if (snakeX < 0) {
    snakeX = squareSize - 1
  } else if (snakeX > squareSize - 1) {
    snakeX = 0
  } else if (snakeY < 0) {
    snakeY = squareSize - 1
  } else if (snakeY > squareSize - 1) {
    snakeY = 0
  }

  gameField.fillStyle = snakeColor

  snake.forEach((element: Snake) => {
    gameField.fillRect(element.x * squareSize, element.y * squareSize, squareSize - marginSize, squareSize - marginSize)
    const doesItEatItSelf = isGameStarted && element.x === snakeX && element.y === snakeY

    if (doesItEatItSelf) {
      setHighScore(score)
      highScoreElement.innerHTML = showHighScore()
      isGameOver = true
    }
  })

  snake.push({ x: snakeX, y: snakeY })

  while (snake.length > tailSizeSnake) {
    snake.shift()
  }

  const isTheSnakeAteTheApple = appleX === snakeX && appleY === snakeY

  if (isTheSnakeAteTheApple) {
    tailSizeSnake++
    score++
    scoreElement.innerHTML = showScore(score)

    appleX = randomCoordinate(squareSize)
    appleY = randomCoordinate(squareSize)
  }
}

const createApple = () => {
  gameField.fillStyle = appleColor
  gameField.fillRect(appleX * squareSize, appleY * squareSize, squareSize - marginSize, squareSize - marginSize)
}

const game = () => {
  if (isGameOver) {
    createGameOver()
  } else if (isGamePaused) {
    createPause()
  } else {
    createBackground()
    createGrid()
    createApple()
    createSnake()
  }
}

const startTheGame = () => {
  if (!isGameStarted) {
    isGameStarted = !isGameStarted
  }
}

const keyDown = (event: KeyboardEvent) => {
  if (event.code === 'Escape') {
    isGameOver = !isGameOver

    clearInterval(gameInterval)
    clearInterval(timerInterval)
    initTheGame()
  }

  if (!isGameOver) {
    if (event.code === 'Space') {
      isGamePaused = !isGamePaused
    }

    if (!isGamePaused) {
      if (event.code === 'ArrowLeft' && oldDirection !== 'ArrowRight') {
        newDirection = event.code
        startTheGame()
      } else if (event.code === 'ArrowRight' && oldDirection !== 'ArrowLeft') {
        newDirection = event.code
        startTheGame()
      } else if (event.code === 'ArrowUp' && oldDirection !== 'ArrowDown') {
        newDirection = event.code
        startTheGame()
      } else if (event.code === 'ArrowDown' && oldDirection !== 'ArrowUp') {
        newDirection = event.code
        startTheGame()
      }
    }
  }
}

function timer() {
  if (isGameStarted) {
    if (!isGamePaused && !isGameOver) {
      time = time + 1
    }

    timerElement.innerHTML = showTimer(time)
  }
}

function createPause() {
  const text = 'Pause'

  gameField.fillStyle = '#fff'
  gameField.font = `bold ${squareSize * 2}px eightiesFont`
  gameField.textBaseline = 'middle'
  gameField.fillText(text, (gameFieldSize / 2) - (gameField.measureText(text).width / 2), (gameFieldSize / 2))
}

function createGameOver() {
  const text = 'Game Over'

  gameField.fillStyle = '#fff'
  gameField.font = `bold ${squareSize * 2}px eightiesFont`
  gameField.textBaseline = 'middle'
  gameField.fillText(text, (gameFieldSize / 2) - (gameField.measureText(text).width / 2), (gameFieldSize / 2))
}

function initTheGame() {
  isGameStarted = false
  snake = []
  time = 0
  timerElement.innerHTML = showTimer(time)
  score = 0
  scoreElement.innerHTML = scoreHtml
  snakeX = squareSize / 2
  snakeY = squareSize / 2
  oldDirection = ''
  newDirection = ''
  tailSizeSnake = tailSizeSnakeInit

  timerInterval = setInterval(timer, oneSecond)
  gameInterval = setInterval(game, speed)
}

window.addEventListener('keydown', keyDown)
window.addEventListener('load', load)
initTheGame()
