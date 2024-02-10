import { Game } from '../entities/Game'
import { $ } from '../utils'

export function createBackground(gameField: CanvasRenderingContext2D, game: Game) {
  gameField.fillStyle = $<HTMLInputElement>('#backgroundColor').value
  gameField.fillRect(game.x(), game.y(), game.width(), game.height())
}
