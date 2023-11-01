module.exports = { buildMessagePage }

function buildMessagePage() {
  const strPage = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="messages.css">
  <title></title>
</head>

<body>
  <h1>Message's board</h1>
  <main class="main">
    <div class="message">
      <p class="author">Vasya Pupkin</p>
      <hr>
      <p class="text">bla bla bla bla bla bla bla bla bla</p>
    </div>
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