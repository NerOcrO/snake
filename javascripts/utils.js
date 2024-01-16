const getHighScore = () => localStorage.getItem('highScore') || 0

const $ = (selector) => document.querySelector(selector)

export const $$ = (selector) => document.querySelectorAll(selector)

export const getNow = () => new Date()

export const setHighScore = (currentScore) => {
  if (getHighScore() < currentScore) {
    localStorage.setItem('highScore', currentScore)
  }
}

export const makingOfScore = (score) => '00000'.concat(`<span>${score}</span>`).slice(-19)

export const fillHighScore = () => `🏆 ${makingOfScore(getHighScore())}`

export const setTimer = (now, startDate, accumulationdiffPause) => {
  const diff = Math.floor((now - startDate) / 1000) - accumulationdiffPause
  const second = diff % 60
  const minute = Math.floor((diff / 60) % 60)
  const hour = Math.floor((diff / 3600) % 60)
  const showTime = (time) => `<span>${'0'.concat(time).slice(-2)}</span>`

  return `${showTime(hour)}:${showTime(minute)}:${showTime(second)}`
}

export default $
