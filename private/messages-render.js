module.exports = { messagesRender }
const {setBgColor} = require('./set-bg-color.js')

function messagesRender(arr) {
  return arr.reduce((acum, el) => {
    return acum + `
    <div class="message" style="background: ${el.background};">
      <div class="author">
        <p class="author-name">${el.author}</p>
        <p class="time">${el.time}</p>
      </div>
      <hr>
      <p class="text">${el.text}</p>
    </div>`    
  }, '')
}
