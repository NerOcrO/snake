import { Game } from '../entities/Game'
import { BodySnake, Snake } from '../entities/Snake'
import { $ } from '../utils'

export function createSnake(gameField: CanvasRenderingContext2D, game: Game, snake: Snake, marginSize: number) {
  gameField.fillStyle = $<HTMLInputElement>('#snakeColor').value

  snake.body().forEach((partOfBodySnake: BodySnake) => {
    gameField.fillRect(
      partOfBodySnake.x * game.numberOfSquare(),
      partOfBodySnake.y * game.numberOfSquare(),
      game.numberOfSquare() - marginSize,
      game.numberOfSquare() - marginSize
    )
  })
}
