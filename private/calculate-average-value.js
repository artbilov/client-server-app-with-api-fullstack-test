module.exports = { calculateAverageValue }


function calculateAverageValue(currentNumber, previousNumber) {
  if (!previousNumber || previousNumber === '') return currentNumber
  return (previousNumber + currentNumber) / 2
}
