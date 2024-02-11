import { Apple } from './Apple'
import { Score } from './Score'
import { ScoreRepository } from './ScoreRepository'
import { Snake } from './Snake'

export class Game {
  private _isOver = false
  private _isPaused = false
  private _isStarted = false
  private readonly _x = 0
  private readonly _y = 0

  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly _numberOfSquare: number,
    private readonly apple: Apple,
    private readonly snake: Snake,
    private readonly score: Score
  ) {}

  numberOfSquare(): number {
    return this._numberOfSquare
  }

  x(): number {
    return this._x
  }

  y(): number {
    return this._y
  }

  width(): number {
    return this._numberOfSquare * this._numberOfSquare
  }

  height(): number {
    return this._numberOfSquare * this._numberOfSquare
  }

  isStarted(): boolean {
    return this._isStarted
  }

  start() {
    if (!this.isStarted()) {
      this._isStarted = true
    }
  }

  isPaused(): boolean {
    return this._isPaused
  }

  togglePause() {
    if (this.isPaused()) {
      this._isPaused = false
    } else {
      this._isPaused = true
    }
  }

  isOver(): boolean {
    return this._isOver
  }

  over() {
    this._isOver = true
  }

  isTheSnakeEatTheApple() {
    const isAppleXAxisEqualToSnakeXAxis = this.apple.x() === this.snake.x()
    const isAppleYAxisEqualToSnakeYAxis = this.apple.y() === this.snake.y()

    if (isAppleXAxisEqualToSnakeXAxis && isAppleYAxisEqualToSnakeYAxis) {
      this.snake.growUp()
      this.score.addAPoint()
      this.apple.changeTheCoordinates(this.randomCoordinate(), this.randomCoordinate())
    }
  }

  overWhenTheSnakeIsDead() {
    if (this.snake.isDead()) {
      this.scoreRepository.save(this.score.total())
      this.over()
    }
  }

  overWhenTheWallIsTouched() {
    if (
      this.snake.head().x < 0 ||
      this.snake.head().x > this._numberOfSquare - 1 ||
      this.snake.head().y < 0 ||
      this.snake.head().y > this._numberOfSquare - 1
    ) {
      this.snake.dead()
    }
  }

  randomCoordinate(): number {
    return Math.floor(Math.random() * this._numberOfSquare)
  }
}
