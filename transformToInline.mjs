import { readFileSync, writeFileSync } from 'fs'

let html = readFileSync('dist/index.html', { encoding: 'utf8' })
const css = readFileSync('dist/style.css', { encoding: 'utf8' })
const js = readFileSync('dist/playground.js', { encoding: 'utf8' })
html = html.replace('<link rel=stylesheet href=style.css>', `<style>${css}</style>`)
html = html.replace('<script type=module src=playground.js></script>', `<script type=module>${js}</script>`)
writeFileSync('dist/index.html', html)
