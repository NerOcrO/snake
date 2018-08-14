const getHighScore = () => localStorage.getItem('highScore') || 0

export const $ = selector => document.querySelector(selector)

export const $$ = selector => document.querySelectorAll(selector)

export const getNow = () => {
  const now = new Date()
  const getTime = () => now.getTime()
  return now
}

export const setHighScore = (currentScore) => {
  if (getHighScore() < currentScore) {
    localStorage.setItem('highScore', currentScore)
  }
}

export const fillHighScore = () => {
  const highScore = getHighScore()
  const drainZero = '000000'.slice(0, -highScore.toString().length)

  return `🏆 ${drainZero}<span>${highScore}</span>`
}

export const setTimer = (now, startDate, cumuldiffPause) => {
  const diff = Math.floor((now - startDate) / 1000) - cumuldiffPause
  const second = diff % 60
  const minute = Math.floor((diff / 60) % 60)
  const hour = Math.floor((diff / 3600) % 60)

  return `<span>${'00'.slice(0, -hour.toString().length)}${hour}</span>:<span>${'00'.slice(0, -minute.toString().length)}${minute}</span>:<span>${'00'.slice(0, -second.toString().length)}${second}</span>`
}
