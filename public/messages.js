const btn = document.getElementsByClassName('btn-send')[0];

btn.addEventListener('click', async () => {
  const author = document.getElementsByClassName('add-author')[0].value
  const text = document.getElementsByClassName('add-text')[0].value
  const date = new Date()
  const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const time = date.getDate() + ' ' + monthes[date.getMonth()] + ' ' + date.getFullYear() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes())
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
  return [
    "aliceblue",
    "lavender",
    "mintcream",
    "lightcyan",
    "powderblue",
    "cornsilk",
    "honeydew",
    "lightyellow",
    "lavenderblush",
    "floralwhite"
  ][Math.floor(Math.random() * 10)]
}