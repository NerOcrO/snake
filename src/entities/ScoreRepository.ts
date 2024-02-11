export interface ScoreRepository {
  load(): number
  save(currentScore: number): void
}
