const inputNumber = document.querySelector('.input-number')
const form = document.querySelector('.counting')
const checkMinus = document.querySelector('.check-minus')
const checkFraction = document.querySelector('.check-fraction')
const [previousNumColumn] = document.getElementsByClassName('last-num-list')
const [currentNumColumn] = document.getElementsByClassName('current-value-list')
const [averageValueColumn] = document.getElementsByClassName('average-value-list')

getNumbersTable().then(renderNumbersTable)

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (inputNumber.value == '0') {
    const currentNumber = handleInputNumber(0)
    await requestAverageValue(currentNumber)
  } else {
    const currentNumber = handleInputNumber(+inputNumber.value)
    await requestAverageValue(currentNumber)
  }
  form.reset()
})

// функции
function handleInputNumber(num) {
  if (checkMinus.checked) return num = -num
  if (!checkFraction.checked) return num = Math.floor(num)
  return num
}

async function requestAverageValue(currentNumber) {
  const url = '/api/average'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentNumber,
    }, null, 2),
  })
  if (response.ok) {
    console.log(response)
    const { previousNumber, currentNumber, averageValue } = await response.json()
    if (previousNumber === '') {
      previousNumColumn.insertAdjacentHTML('afterbegin', `<li class="number">*</li>`)
    } else {
      previousNumColumn.insertAdjacentHTML('afterbegin', `<li class="number">${previousNumber}</li>`)
    }
    currentNumColumn.insertAdjacentHTML('afterbegin', `<li class="number">${currentNumber}</li>`)
    averageValueColumn.insertAdjacentHTML('afterbegin', `<li class="number">${averageValue}</li>`)
    form
  }
}

async function getNumbersTable() {
  const url = '/api/get-numbers'

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  })
  if (response.ok) {
    const numbersTable = await response.json()
    return numbersTable
  }
}

function renderNumbersTable(arr) {
  previousNumColumn.innerHTML = arr.reduce((acum, el) => {
    return `<li class="number">${el.previousNumber === '' ? '*' : +el.previousNumber}</li>` + acum
  }, '')
  currentNumColumn.innerHTML = arr.reduce((acum, el) => {
    return `<li class="number">${el.currentNumber}</li>` + acum
  }, '')
  averageValueColumn.innerHTML = arr.reduce((acum, el) => {
    return `<li class="number">${el.averageValue}</li>` + acum
  }, '')
}