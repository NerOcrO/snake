export const $ = (selector: string): Element | null => document.querySelector(selector)

export const $$ = (selector: string): NodeListOf<Element> => document.querySelectorAll(selector)

export const randomPlace = (height: number): number => Math.floor(Math.random() * height)
