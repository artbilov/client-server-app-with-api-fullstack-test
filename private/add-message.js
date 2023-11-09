module.exports = { handleAddMessage }

async function handleAddMessage(body, response) {
  let message = JSON.parse(body)
  console.log(message)
  messages.push(message)
  fs.writeFileSync('./private/data/messages-depot.json', JSON.stringify(messages, null, 2), 'utf-8')
  response.end('ok')
}


const messages = require('./data/messages-depot.json')
const fs = require('fs') 