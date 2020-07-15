const imageDiv = document.getElementById("img")

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.style.display = "block"
canvas.style.margin = "0 auto"

imageDiv.appendChild(canvas)

const inputs = document.getElementsByClassName("input")
const button = document.getElementById("btn")


let optionsArray = []

let widthC = optionsArray[0]
let heightC = optionsArray[1]

let changeRate = optionsArray[2]

let pixelSize = optionsArray[3]


const inputCheck = () => {
  let j = 0
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== "") {
      optionsArray[i] = parseInt(inputs[i].value)
      j++
    }
  }

  if (j === inputs.length) {
    draw(optionsArray[0], optionsArray[1], optionsArray[2], optionsArray[3])
    j = 0
  }
}



Array.from(inputs).forEach(function (e) {
  e.addEventListener("focusout", inputCheck);
});

button.addEventListener("click", inputCheck)

const randomizer = (rgbValue, changeRate) => {
  let sign = Math.random()
  let num = Math.random() * changeRate
  if (sign < 0.5 || rgbValue < 0) {
    rgbValue += num
  }
  if (sign > 0.5 || rgbValue > 250) {
    rgbValue -= num
  }

  return rgbValue
}

const draw = (widthC, heightC, pixelSize, changeRate) => {

  let initialRgb = [Math.random() * 255, Math.random() * 255, Math.random() * 255]

  canvas.width = widthC
  canvas.height = heightC

  let row = []

  let column = []

  let lastOfRow = []

  for (let j = 0; j < heightC; j += pixelSize) {
    row = []
    for (let i = 0; i < widthC; i += pixelSize) {

      let rgb = []

      if (i == 0) {
        rgb = initialRgb
      }

      // && j == 0

      // else if (i == 0 && j != 0){
      //   rgb = lastOfRow
      // }

      else {
        rgb = row[(i / pixelSize) - 1]
      }

      rgb[0] = randomizer(rgb[0], changeRate)
      rgb[1] = randomizer(rgb[1], changeRate)
      rgb[2] = randomizer(rgb[2], changeRate)

      ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
      ctx.fillRect(i, j, pixelSize, pixelSize)

      row.push(rgb)

      // if(i == widthC){
      //   lastOfRow = rgb
      // }

    }

    // column.push(row)

  }

}

draw(400,400,5,1)
