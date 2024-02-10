import { Game } from '../entities/Game'

export function createGameOver(gameField: CanvasRenderingContext2D, game: Game) {
  const text = 'Game Over'

  gameField.fillStyle = '#fff'
  gameField.font = `bold ${game.numberOfSquare() * 2}px eightiesFont`
  gameField.textBaseline = 'middle'
  gameField.fillText(text, (game.width() / 2) - (gameField.measureText(text).width / 2), (game.height() / 2))
}
