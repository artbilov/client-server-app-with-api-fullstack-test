module.exports = { calculateAverageValue }


function calculateAverageValue(currentNumber, previousNumber) {
  if (previousNumber === '') return currentNumber
  return (previousNumber + currentNumber) / 2
}
