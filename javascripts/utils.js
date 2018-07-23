const getHighScore = () => localStorage.getItem('highScore') || 0

export const getNow = () => {
  const now = new Date()
  const getTime = () => now.getTime()
  return now
}

export const $ = selector => document.querySelector(selector)

export const $$ = selector => document.querySelectorAll(selector)

export const setHighScore = () => {
  const scoreSpan = Number($('#score span').innerHTML)

  if (getHighScore() < scoreSpan) {
    localStorage.setItem('highScore', scoreSpan)
  }
}

export const fillHighScore = () => {
  $('#highScore').innerHTML = `🏆 ${'000000'.slice(0, -getHighScore().toString().length)}<span>${getHighScore()}</span>`
}
