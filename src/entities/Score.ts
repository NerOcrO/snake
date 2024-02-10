export class Score {
  constructor(private score: number) {}

  addAPoint() {
    this.score += 1
  }

  total(): number {
    return this.score
  }
}
