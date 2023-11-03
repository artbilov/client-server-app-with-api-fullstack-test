module.exports = { messagesRender }
const {setBgColor} = require('./set-bg-color.js')

function messagesRender(arr) {
  return arr.reduce((acum, el) => {
    return acum + `
    <div class="message" style="background: ${el.background};">
      <p class="author">${el.author} --- ${el.time}</p>
      <hr>
      <p class="text">${el.text}</p>
    </div>`    
  }, '')
}
