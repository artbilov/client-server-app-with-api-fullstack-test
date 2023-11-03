const btn = document.getElementsByClassName('send')[0];

btn.addEventListener('click', async () => {
  const author = document.getElementsByClassName('add-author')[0].value
  const text = document.getElementsByClassName('add-text')[0].value
  const date = new Date()
  const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const time = date.getDay() + ' ' + monthes[date.getMonth()] + ' ' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
  const url = '/messages.html'
  const payload = { author, text, background : setBgColor(), time }
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(url, options)
  if (response.ok) location.reload()
})

function setBgColor() {
  return ['pink', 'lightblue', 'lightseagreen', 'lightcyan', 'lightsalmon', 'lightcoral', 'lightgray', 'plum', 'palevioletred', 'violet'][Math.floor(Math.random() * 10)]
}