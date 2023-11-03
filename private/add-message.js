module.exports = { handleAddMessage }

function handleAddMessage(request, response) {
  const chunks = []
  request.addListener('data', (chunk) => chunks.push(chunk))
  request.addListener('end', () => {
    const body = Buffer.concat(chunks).toString()
    const message = JSON.parse(body)
    console.log(message)
    messages.unshift(message)
    fs.writeFileSync('./private/data/messages-depot.json', JSON.stringify(messages, null, 2), 'utf-8')
    response.end('ok')
  })
}

const messages = require('./data/messages-depot.json')
const fs = require('fs')