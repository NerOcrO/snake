export function showTimer(hour: number, minute: number, second: number): string {
  const showTime = (digit: number): string => `<span>${'0'.concat(String(digit)).slice(-2)}</span>`

  return `${showTime(hour)}:${showTime(minute)}:${showTime(second)}`
}
