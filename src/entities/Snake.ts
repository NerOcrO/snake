export type BodySnake = Readonly<{
  x: number
  y: number
}>

export class Snake {
  private _direction = ''
  private _oldDirection = ''
  private _snake: BodySnake[] = []
  private _isDead = false

  constructor(x: number, y: number, private tailSize: number) {
    this._snake.push({ x, y })
  }

  move() {
    let x = this.head().x
    let y = this.head().y

    if (this._direction === 'ArrowLeft') {
      x -= 1
    } else if (this._direction === 'ArrowRight') {
      x += 1
    } else if (this._direction === 'ArrowUp') {
      y -= 1
    } else if (this._direction === 'ArrowDown') {
      y += 1
    }

    this._snake.push({ x, y })

    while (this.body().length > this.tailSize) {
      this._snake.shift()
    }

    this._oldDirection = this._direction
  }

  deadWhenItEatsItself() {
    this.body().slice(0, -4).forEach((partOfBodySnake: BodySnake) => {
      if (partOfBodySnake.x === this.head().x && partOfBodySnake.y === this.head().y) {
        this._isDead = true
      }
    })
  }

  newDirection(newDirection: string) {
    if (
      newDirection === 'ArrowLeft' && this._oldDirection !== 'ArrowRight' ||
      newDirection === 'ArrowRight' && this._oldDirection !== 'ArrowLeft' ||
      newDirection === 'ArrowUp' && this._oldDirection !== 'ArrowDown' ||
      newDirection === 'ArrowDown' && this._oldDirection !== 'ArrowUp'
    ) {
      this._direction = newDirection
    }
  }

  body(): BodySnake[] {
    return this._snake
  }

  head(): BodySnake {
    return this._snake.slice(-1)[0]
  }

  growUp() {
    this.tailSize++
  }

  x(): number {
    return this.head().x
  }

  y(): number {
    return this.head().y
  }

  isDead(): boolean {
    return this._isDead
  }
}
