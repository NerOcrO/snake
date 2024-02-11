import { ScoreRepository } from '../entities/ScoreRepository'

export class LocalStorageScoreRepository implements ScoreRepository {
  load(): number {
    return Number(localStorage.getItem('highScore')) || 0
  }

  save(currentScore: number) {
    if (this.load() < currentScore) {
      localStorage.setItem('highScore', String(currentScore))
    }
  }
}
