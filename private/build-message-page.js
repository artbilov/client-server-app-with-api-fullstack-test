
const fs = require('fs')
const messages = require('./data/messages-depot.json')
const { messagesRender } = require('./messages-render.js')

function buildMessagePage() {
  let messagesDom = messagesRender(messages)
  const strPage = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${fs.readFileSync('./public/messages.css', 'utf-8')}</style>
  
  <title></title>
</head>

<body>
  <h1>Message's board</h1>
  <main class="main">
    <form action="javascript:" class="add-message">
      <label><span>Author is : </span><input type="text" class="add-author"></label>
      <label><span>Write your message : </span><textarea type="text" class="add-text"></textarea></label>
      <button class="btn-send">Submit</button>
    </form>
    ${messagesDom}
    <div class="redirect">
      <a class="messages" href="./about-myself.html">About myself</a>
      <a class="counting" href="./counting.html">Counting</a>
    </div>
    <a href="https://github.com/artbilov/client-server-app-with-api-fullstack-test" class="github">GitHub repo</a>
  </main>
  <script>${fs.readFileSync('./public/messages.js', 'utf-8')}</script>
</body>

</html>
  `
  return strPage
}


module.exports = { buildMessagePage }
