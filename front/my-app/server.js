const http = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

var port1 = 80;


app.prepare().then(() => {
  http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    handle(req, res, parsedUrl)
  }).listen(port1, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:'+port1)
  })
  

})