// Tiny static server for the built site (mimics GitHub Pages):
//  - /downloads → dist/downloads.html (clean URLs)
//  - unknown paths → dist/404.html
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import process from 'node:process'

const dist = normalize(join(process.cwd(), 'dist'))
const port = Number(process.env.PORT || 4173)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
}

const send = (res, code, file) => {
  res.writeHead(code, { 'Content-Type': types[extname(file)] || 'application/octet-stream' })
  createReadStream(file).pipe(res)
}

const serve = (req, res) => {
  let pathname
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  } catch {
    res.writeHead(400)
    res.end()
    return
  }
  let file = normalize(join(dist, pathname))
  if (!file.startsWith(dist)) {
    res.writeHead(403)
    res.end()
    return
  }

  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')

  if (existsSync(file) && statSync(file).isFile()) return send(res, 200, file)
  if (existsSync(`${file}.html`) && statSync(`${file}.html`).isFile())
    return send(res, 200, `${file}.html`)

  const notFound = join(dist, '404.html')
  if (existsSync(notFound)) return send(res, 404, notFound)
  res.writeHead(404)
  res.end('Not found')
}

createServer(serve).listen(port, '0.0.0.0', () => {
  console.log(`Serving ${dist} at http://localhost:${port}`)
})
