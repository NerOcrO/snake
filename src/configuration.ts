import { showHighScore } from './score'
import { $, $$ } from './utils'

type HTMLInputOrSelectElement = HTMLInputElement | HTMLSelectElement

export const load = () => {
  ($('#highScore') as HTMLSpanElement).innerHTML = showHighScore()

  $$('input, select').forEach((element: Element) => {
    const elementId = $(`#${element.id}`) as HTMLInputOrSelectElement
    const value = localStorage.getItem(element.id)

    if (value) {
      elementId.value = value
    }

    elementId.addEventListener('input', saveValue)
    elementId.addEventListener('input', changeTitle)
  })
}

function saveValue(event: Event) {
  const target = event.target as HTMLInputOrSelectElement
  localStorage.setItem(target.id, target.value)
}

function changeTitle(event: Event) {
  const target = event.target as HTMLInputOrSelectElement
  ($(`#${target.id}`) as HTMLInputOrSelectElement).title = target.value
}
