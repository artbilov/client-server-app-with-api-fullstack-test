const { createServer } = require('http')
const fs = require('fs')
const port = 1234
const server = createServer()
const messages  = require('./data/messages-depot.js')

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
  } else if (url === '/counting.html') {
    // semi Render system
    response.setHeader('Content-Type', mimeTypes[ext])
    response.end(fs.readFileSync('public/counting.html'))
  } else if (url === '/counting.css') {
    response.setHeader('Content-Type', mimeTypes[ext])
    response.end(fs.readFileSync('public/counting.css'))
  } else if (url === '/messages.html') {
    // SSR
    // response.setHeader('Content-Type', mimeTypes[ext])
    response.end(buildMessagePage())
  }
}

const mimeTypes = {
  'html': 'text/html',
  'css': 'text/css',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'png': 'image/png',
  'ico': 'image/x-icon',
  'json': 'application/json',
}

// const { buildMessagePage } = require('./build-message-page.js')

// <link rel="stylesheet" href="messages.css">
function buildMessagePage() {
  const strPage = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${fs.readFileSync('./public/messages.css', 'utf-8').toString()}</style>
  <title></title>
</head>

<body>
  <h1>Message's board</h1>
  <main class="main">
    ${messageRender(messages)}
    <form action="javascript:" class="add-message">
      <label>Author is : <input type="text" class="add-author"></label>
      <label>Write your message : <textarea type="text" class="add-text"></textarea></label>
      <button class="send">Submit</button>
    </form>
    <div class="redirect">
      <a class="messages" href="./about-myself.html">About myself</a>
      <a class="counting" href="./counting.html">Counting</a>
    </div>
  </main>

</body>

</html>
  `
  return strPage
}
