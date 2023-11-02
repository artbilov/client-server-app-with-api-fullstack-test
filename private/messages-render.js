module.exports = { messagesRender }

function messagesRender(arr) {
  return arr.reduce((acum, el) => {
    return acum + `
    <div class="message">
      <p class="author">${el.author}</p>
      <hr>
      <p class="text">${el.text}</p>
    </div>`    
  }, '')
}
