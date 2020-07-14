let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")

document.body.appendChild(canvas)

let widthC = 300
let heightC = 300

let changeRate = 10

let pixelSize = 10

let initialRgb = [200, 200, 200]

canvas.width = widthC
canvas.height = heightC

let randomizer = (rgbValue) => {
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

let row = []

let column = []

let lastOfRow = []

for (let j = 0; j < heightC; j += pixelSize) {
  row = []
  for (let i = 0; i < widthC; i += pixelSize ) {

    let rgb = []

    console.log(i)

    if (i == 0 && j == 0) {
      rgb = initialRgb
    }

    else if (i == 0 && j != 0){
      rgb = lastOfRow
    }

    else{
      rgb = row[ (i/pixelSize) - 1 ]
    }

    rgb[0] = randomizer(rgb[0])
    rgb[1] = randomizer(rgb[1])
    rgb[2] = randomizer(rgb[2])

    ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    ctx.fillRect(i,j,pixelSize,pixelSize)

    row.push(rgb)

    if(i == widthC){
      lastOfRow = rgb
    }

  }

  column.push(row)

}

console.log(row[0])
console.log(row[10])
console.log(row[20])




