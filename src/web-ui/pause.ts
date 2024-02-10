import { Game } from '../entities/Game'

export function createPause(gameField: CanvasRenderingContext2D, game: Game) {
  const text = 'Pause'

  gameField.fillStyle = '#fff'
  gameField.font = `bold ${game.numberOfSquare() * 2}px eightiesFont`
  gameField.textBaseline = 'middle'
  gameField.fillText(text, (game.width() / 2) - (gameField.measureText(text).width / 2), (game.height() / 2))
}
