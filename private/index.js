const { createServer } = require('http')
const fs = require('fs')
const server = createServer()
const port = 1234
const { buildMessagePage } = require('./build-message-page.js')
const { mimeTypes } = require('./mimeTypes.js')
const { handleAddMessage } = require('./add-message.js')
const { calculateAverageValue } = require('./calculate-average-value.js')

server.listen(port, () => {
  console.log('Server started at http://localhost:' + port)
})

server.addListener('request', handleRequest)

// arr of numbers read from file
const numbersArr = []
readNumbers()
function readNumbers() {
  fs.readFile('./private/data/numbers-depot.json', 'utf-8', (err, data) => {
    if (err) return console.log(err)
    JSON.parse(data).forEach(iteration => {
      numbersArr.push(iteration)
    })
  })
}

// // reading previous numbers from file onload of the page
// const previousNumbers = []
// readPreviousNumbers()
// function readPreviousNumbers() {
//   fs.readFile('./private/data/numbers-depot.json', 'utf-8', (err, data) => {
//     if (err) return console.log(err)
//     JSON.parse(data).forEach(iteration => {
//       previousNumbers.push(iteration.previousNumber)
//     })
//   })
// }

async function handleRequest(request, response) {
  const body = await getBody(request)
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
  } else if (url === '/counting.js') {
    response.setHeader('Content-Type', mimeTypes[ext])
    response.end(fs.readFileSync('public/counting.js'))
  } else if (url === '/messages.html') {
    // SSR
    if (method === 'GET') {
      response.setHeader('Content-Type', mimeTypes[ext])
      response.end(buildMessagePage())
    } else if (method === 'POST') {
      handleAddMessage(request, response)
    }
  } else if (url.startsWith('/api/')) {
    const endpoint = url.split('/api/')[1]
    if (endpoint === 'get-numbers') {
      response.end(fs.readFileSync('./private/data/numbers-depot.json'))
    } else if (endpoint === 'average' && method === 'POST') {
      const previousNumber = numbersArr.at(-1) === undefined ? '' : +numbersArr.at(-1)?.currentNumber 
      const currentNumber = JSON.parse(body).currentNumber
      const averageValue = calculateAverageValue(currentNumber, previousNumber)
      const result = { previousNumber, currentNumber, averageValue }
      response.end(JSON.stringify(result))
      numbersArr.push({ previousNumber, currentNumber, averageValue })
      fs.writeFileSync('./private/data/numbers-depot.json', JSON.stringify(numbersArr, null, 2), 'utf-8')
    } else {
      response.statusCode = 404
      response.setHeader('Content-Type', mimeTypes['html'])
      response.end(fs.readFileSync('./public/not-found.html'))
    }
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', mimeTypes['html'])
    response.end(fs.readFileSync('./public/not-found.html'))
  }
}

async function getBody(request) {
  let body = ''
  for await (const chunk of request) body += chunk
  return body
}

