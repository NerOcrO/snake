import { Apple } from './entities/Apple'
import { Game } from './entities/Game'
import { Score } from './entities/Score'
import { Snake } from './entities/Snake'
import { Timer } from './entities/Timer'
import { LocalStorageScoreRepository } from './gateways/LocalStorageScoreRepository'
import { $, $$ } from './utils'
import { createApple } from './web-ui/apple'
import { createBackground } from './web-ui/background'
import { createGameOver } from './web-ui/game-over'
import { createGrid } from './web-ui/grid'
import { createPause } from './web-ui/pause'
import { showHighScore, showScore } from './web-ui/score'
import { createSnake } from './web-ui/snake'
import { showTimer } from './web-ui/timer'

type HTMLInputOrSelectElement = HTMLInputElement | HTMLSelectElement

const highScoreElement = $<HTMLSpanElement>('#highScore')
const scoreElement = $<HTMLSpanElement>('#score')
const timerElement = $<HTMLSpanElement>('#timer')
const gameField = $<HTMLCanvasElement>('canvas').getContext('2d') as CanvasRenderingContext2D
const numberOfSquare = Number($<HTMLInputElement>('#numberOfSquare').value)
const marginSize = 2
const localStorageScoreRepository = new LocalStorageScoreRepository()

let game: Game
let apple: Apple
let score: Score
let timer: Timer
let snake: Snake
let gameInterval: number
let timerInterval: number

function currentGame() {
  if (game.isOver()) {
    createGameOver(gameField, game)
  } else if (game.isPaused()) {
    createPause(gameField, game)
  } else {
    createBackground(gameField, game)
    createGrid(gameField, game, marginSize)
    createApple(gameField, game, apple, marginSize)
    createSnake(gameField, game, snake, marginSize)

    if (game.isStarted()) {
      snake.move()
      snake.deadWhenItEatsItself()
      game.overWhenTheWallIsTouched()
      game.overWhenTheSnakeIsDead()

      if (!game.isOver()) {
        game.isTheSnakeEatTheApple()

        highScoreElement.innerHTML = showHighScore(localStorageScoreRepository.load())
        scoreElement.innerHTML = showScore(score.total())
      }
    }
  }
}

function currentTimer() {
  if (game.isStarted()) {
    if (!game.isPaused() && !game.isOver()) {
      timer.increment()
    }

    timerElement.innerHTML = showTimer(timer.hour(), timer.minute(), timer.second())
  }
}

function setupKeyDown(event: KeyboardEvent) {
  if (event.code === 'Escape') {
    game.over()

    clearInterval(gameInterval)
    clearInterval(timerInterval)
    initTheGame()
  }

  if (!game.isOver()) {
    if (event.code === 'Space') {
      game.togglePause()
    }

    if (!game.isPaused()) {
      if (event.code === 'ArrowLeft') {
        snake.newDirection(event.code)
        game.start()
      } else if (event.code === 'ArrowRight') {
        snake.newDirection(event.code)
        game.start()
      } else if (event.code === 'ArrowUp') {
        snake.newDirection(event.code)
        game.start()
      } else if (event.code === 'ArrowDown') {
        snake.newDirection(event.code)
        game.start()
      }
    }
  }
}

function setupInputsAndSelects() {
  $$('input, select').forEach((element: Element) => {
    const elementId = $<HTMLInputOrSelectElement>(`#${element.id}`)
    const value = localStorage.getItem(element.id)

    if (value) {
      elementId.value = value
    }

    elementId.addEventListener('input', saveValue)
    elementId.addEventListener('input', changeTitle)
  })

  function saveValue(event: Event) {
    const target = event.target as HTMLInputOrSelectElement
    localStorage.setItem(target.id, target.value)
  }

  function changeTitle(event: Event) {
    const target = event.target as HTMLInputOrSelectElement
    $<HTMLInputOrSelectElement>(`#${target.id}`).title = target.value
  }
}

function initTheGame() {
  const tailSizeSnake = Number($<HTMLInputElement>('#tailSizeSnake').value)
  const speed = Number($<HTMLInputElement>('#speed').value)
  const center = numberOfSquare / 2

  apple = new Apple()
  snake = new Snake(center, center, tailSizeSnake)
  score = new Score(0)
  timer = new Timer(0)
  game = new Game(localStorageScoreRepository, numberOfSquare, apple, snake, score)
  apple.changeTheCoordinates(game.randomCoordinate(), game.randomCoordinate())

  highScoreElement.innerHTML = showHighScore(localStorageScoreRepository.load())
  scoreElement.innerHTML = showScore(score.total())
  timerElement.innerHTML = showTimer(timer.hour(), timer.minute(), timer.second())

  const oneSecond = 1000
  timerInterval = setInterval(currentTimer, oneSecond)
  gameInterval = setInterval(currentGame, speed)
  setupInputsAndSelects()
}

window.addEventListener('keydown', setupKeyDown)
window.addEventListener('load', initTheGame)
