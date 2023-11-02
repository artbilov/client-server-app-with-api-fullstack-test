const { createServer } = require('http')
const fs = require('fs')
const { buildMessagePage } = require('./build-message-page.js')
const { mimeTypes } = require('./mimeTypes.js')
const port = 1234
const server = createServer()
const messages = require('./data/messages-depot.json')

server.listen(port, () => {
  console.log('Server started at http://localhost:' + port)
})

server.addListener('request', handleRequest)

function handleRequest(request, response) {

  const { url, method } = request
  console.log(method, url)
  const ext = url.match(/(?<=\.)[^./]+$/)?.[0] || 'html'


  if (url === '/about-myself.html' || url === '/') {
    response.setHeader('Content-Type', mimeTypes[ext])
    response.end(fs.readFileSync('public/about-myself.html'))
  } else if (url === '/favicon.ico') {
    response.setHeader('Content-Type', mimeTypes[ext])
    response.end(fs.readFileSync('public/favicon.ico'))
  } else if (url === '/charter-tbot.png') {
    response.setHeader('Content-Type', mimeTypes[ext])
    response.end(fs.readFileSync('public/charter-tbot.png'))
  } else if (url === '/about-myself.css') {
    response.setHeader('Content-Type', mimeTypes[ext])
    response.end(fs.readFileSync('public/about-myself.css'))
    // 
  } else if (url === '/counting.html') {
    // CSR system
    response.setHeader('Content-Type', mimeTypes[ext])
    response.end(fs.readFileSync('public/counting.html'))
  } else if (url === '/counting.css') {
    response.setHeader('Content-Type', mimeTypes[ext])
    response.end(fs.readFileSync('public/counting.css'))

  } else if (url === '/messages.html') {
    // SSR
    if (method === 'GET') {
      response.setHeader('Content-Type', mimeTypes[ext])
      response.end(buildMessagePage())
    } else if (method === 'POST') {
      const chunks = []
      request.addListener('data', (chunk) => chunks.push(chunk))
      request.addListener('end', () => {
        const body = Buffer.concat(chunks).toString()
        const message = JSON.parse(body)
        console.log(message)
        messages.unshift(message)
        fs.writeFileSync('./private/data/messages-depot.json', JSON.stringify(messages))
        response.end('ok')
      })
    }
  }
}


