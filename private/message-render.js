module.exports = { messageRender }

function messageRender(arr) {
  const acum = arr.reduce((acc, el) => {
    acc += `
    <div class="message">
      <p class="author">${el.author}</p>
      <hr>
      <p class="text">${el.text}</p>
    </div>`
    return acc
  })
}
