import { readFileSync, writeFileSync } from 'node:fs'

// GitHub Pages has no SPA rewrites. Serving the app shell as 404.html
// lets client-side routes (e.g. /downloads) work after a hard refresh.
const html = readFileSync('dist/index.html', 'utf8')
writeFileSync('dist/404.html', html)
