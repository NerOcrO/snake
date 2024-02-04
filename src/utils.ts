const getHighScore = (): number => Number(localStorage.getItem('highScore')) || 0

// @ts-ignore
export const $ = (selector) => document.querySelector(selector)

// @ts-ignore
export const $$ = (selector) => document.querySelectorAll(selector)

export const getNow = (): Date => new Date()

export const setHighScore = (currentScore: number) => {
  if (getHighScore() < currentScore) {
    localStorage.setItem('highScore', String(currentScore))
  }
}

export const makingOfScore = (score: number): string => '00000'.concat(`<span>${score}</span>`).slice(-19)

export const fillHighScore = (): string => `🏆 ${makingOfScore(getHighScore())}`

export const setTimer = (now: number, startDate: number, accumulationdiffPause: number): string => {
  const diff = Math.floor((now - startDate) / 1000) - accumulationdiffPause
  const second = diff % 60
  const minute = Math.floor((diff / 60) % 60)
  const hour = Math.floor((diff / 3600) % 60)
  const showTime = (time: number): string => `<span>${'0'.concat(String(time)).slice(-2)}</span>`

  return `${showTime(hour)}:${showTime(minute)}:${showTime(second)}`
}
