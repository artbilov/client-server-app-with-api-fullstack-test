const btn = document.getElementsByClassName('send')[0];

btn.addEventListener('click', async () => {
  const author = document.getElementsByClassName('add-author')[0].value
  const text = document.getElementsByClassName('add-text')[0].value
  const url = '/messages.html'
  const payload = { author, text }
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(url, options)
  if (response.ok) location.reload()
})