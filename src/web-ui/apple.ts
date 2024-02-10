import { Apple } from '../entities/Apple'
import { Game } from '../entities/Game'
import { $ } from '../utils'

export function createApple(gameField: CanvasRenderingContext2D, game: Game, apple: Apple, marginSize: number) {
  gameField.fillStyle = $<HTMLInputElement>('#appleColor').value
  gameField.fillRect(
    apple.x() * game.numberOfSquare(),
    apple.y() * game.numberOfSquare(),
    game.numberOfSquare() - marginSize,
    game.numberOfSquare() - marginSize
  )
}
