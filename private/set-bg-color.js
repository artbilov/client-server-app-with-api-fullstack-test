module.exports = {setBgColor}

function setBgColor() {
  return ['pink', 'lightblue', 'lightseagreen', 'lightcyan', 'lightsalmon', 'lightcoral', 'lightgray', 'plum', 'palevioletred', 'violet'][Math.floor(Math.random() * 10)]
}