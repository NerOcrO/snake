import { Game } from '../entities/Game'
import { $ } from '../utils'

export function createGrid(gameField: CanvasRenderingContext2D, game: Game, marginSize: number) {
  gameField.fillStyle = $<HTMLInputElement>('#gridColor').value
  const column = (counter: number) => gameField.fillRect(game.numberOfSquare() * counter - marginSize, game.y(), marginSize, game.height())
  const line = (counter: number) => gameField.fillRect(game.x(), game.numberOfSquare() * counter - marginSize, game.width(), marginSize)

  for (let counter = 0; counter <= game.numberOfSquare(); counter++) {
    column(counter)
    line(counter)
  }
}
