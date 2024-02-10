export function showTimer(time: number): string {
  const timer = setTimer(time)
  const showTime = (time: number): string => `<span>${'0'.concat(String(time)).slice(-2)}</span>`

  return `${showTime(timer.hour)}:${showTime(timer.minute)}:${showTime(timer.second)}`
}

type Timer = Readonly<{
  hour: number
  minute: number
  second: number
}>

export function setTimer(time: number): Timer {
  const second = time % 60
  const minute = Math.floor((time / 60) % 60)
  const hour = Math.floor((time / 3600) % 60)

  return {
    hour,
    minute,
    second,
  }
}
