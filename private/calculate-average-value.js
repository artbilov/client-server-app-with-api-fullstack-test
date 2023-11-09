module.exports = { calculateAverageValue }


function calculateAverageValue(currentNumber, previousNumber) {
  if (previousNumber === '') return currentNumber
  const average = (previousNumber + currentNumber) / 2
  return +average.toFixed(2)
}
