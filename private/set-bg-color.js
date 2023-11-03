module.exports = { setBgColor }

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