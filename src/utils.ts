export function $<T>(selector: string): T {
  return document.querySelector(selector) as T
}

export const $$ = (selector: string): NodeListOf<Element> => document.querySelectorAll(selector)
