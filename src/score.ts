export const setHighScore = (currentScore: number) => {
  if (getHighScore() < currentScore) {
    localStorage.setItem('highScore', String(currentScore))
  }
}

export const showScore = (score: number): string => '00000'.concat(`<span>${score}</span>`).slice(-19)

export const showHighScore = (): string => `🏆 ${showScore(getHighScore())}`

const getHighScore = (): number => Number(localStorage.getItem('highScore')) || 0
