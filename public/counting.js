// слушатель событий нажатия на кнопку Enter в поле ввода
const inputNumber = document.querySelector('.input-number')
const checkMinus = document.querySelector('.check-minus')
const checkFraction = document.querySelector('.check-fraction')

renderNumbersTable()

inputNumber.addEventListener('keydown', async (event) => {
  if (event.key !== 'Enter') {
    return
  } else {
    event.preventDefault()
    const currentNumber = inputNumber.value
    await requestAverageValue(currentNumber)
    
  }
})







// функции
function requestAverageValue(currentNumber) {
  const url = '/api/average'
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentNumber: currentNumber,
      checkMinus: checkMinus.checked,
      checkFraction: checkFraction.checked
    }, null, 2),
  })
  if (response.ok) {

    renderNumbersTable()
  }
}
  

async function renderNumbersTable() {
  const url = '/api/get-numbers'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.ok) {
    console.log(response)
  }
}   