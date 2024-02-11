export const showScore = (score: number): string => '00000'.concat(`<span>${score}</span>`).slice(-19)

export const showHighScore = (highScore: number): string => `🏆 ${showScore(highScore)}`
