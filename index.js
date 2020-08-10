const imageDiv = document.getElementById("img")

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.style.display = "block"
canvas.style.margin = "0 auto"

imageDiv.appendChild(canvas)

const inputs = document.getElementsByClassName("input")
const button = document.getElementById("btn")

const Senacanvas = document.createElement("canvas");

let optionsArray = []

let widthC = optionsArray[0]
let heightC = optionsArray[1]
let pixelSize = optionsArray[2]
let changeRate = optionsArray[3]


const inputCheck = () => {
  let j = 0, senaC = 0
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== "") {
      optionsArray[i] = parseInt(inputs[i].value)
      j++
    }

    if (inputs[i].value === "1" && i !== 2) {
      senaC++
    }

  }

  if (j === inputs.length) {
    draw(optionsArray[0], optionsArray[1], optionsArray[2], optionsArray[3])
    j = 0
  }

  if (senaC == inputs.length - 1){
    senaVerici()
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

function getColor(x, y, canvas) {
  var context = canvas.getContext("2d");
  var pixel = context.getImageData(x, y, 1, 1);

  var rgb = pixel.data;

  let nRgb = Array.from(rgb);
  nRgb.pop();

  return nRgb;
}

const draw = (widthC, heightC, pixelSize, changeRate) => {

  let initialRgb = [Math.random() * 255, Math.random() * 255, Math.random() * 255]

  canvas.width = widthC
  canvas.height = heightC

  let row = []

  for (let j = 0; j < heightC; j += pixelSize) {
    row = []
    for (let i = 0; i < widthC; i += pixelSize) {

      let rgb = []

      if (i == 0) {
        rgb = initialRgb
      }

      else {
        rgb = row[(i / pixelSize) - 1]
      }

      rgb[0] = randomizer(rgb[0], changeRate)
      rgb[1] = randomizer(rgb[1], changeRate)
      rgb[2] = randomizer(rgb[2], changeRate)

      ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
      ctx.fillRect(i, j, pixelSize, pixelSize)

      row.push(rgb)

    }

  }

}


draw(400, 400, 5, 1)


const senaVerici = () => {

  PSRate = optionsArray[2]

  canvas.style.display = "none"

  

  Senacanvas.style.display = "block"
  Senacanvas.style.margin = "0 auto"

  imageDiv.appendChild(Senacanvas);

  Senacanvas.width = 400;
  Senacanvas.height = 400;

  var ctxS = Senacanvas.getContext("2d");

  // context.drawImage(image, 0, 0);


  for (let j = 0; j < 400; j += PSRate) {

    for (let i = 0; i < 400; i += PSRate) {

      ctxS.fillStyle = `rgb(${senaArray[j][i][0]},${senaArray[j][i][1]},${senaArray[j][i][2]})`
      ctxS.fillRect(i, j, PSRate, PSRate)

    }

  }
}



let sRow = []
let sCol = []

const pixelizator = () => {


  for (let j = 0; j < 400; j++) {
    sRow = []
    for (let i = 0; i < 400; i++) {

      sRow[i] = getColor(i,j,Senacanvas)


    }

    sCol.push(sRow)

  }


}

const drawSena = (PSRate, array) => {

  const nCanvas = document.createElement("canvas")

  document.body.appendChild(nCanvas)

  nCanvas.width = 400
  nCanvas.height = 400



  const ctxS = nCanvas.getContext("2d")

  for (let j = 0; j < 400; j += PSRate) {

    for (let i = 0; i < 400; i += PSRate) {

      ctxS.fillStyle = `rgb(${array[j][i][0]},${array[j][i][1]},${array[j][i][2]})`
      ctxS.fillRect(i, j, PSRate, PSRate)

    }

  }

}

// let saveData = (data, fileName) => { 
//   var a = document.createElement("a")
//   document.body.appendChild(a)
//   a.style = "display: none"
//   var json = JSON.stringify(data), 
//       blob = new Blob([json], {type: "octet/stream"}), 
//       url = window.URL.createObjectURL(blob)
//   a.href = url
//   a.download = fileName
//   a.click()
//   window.URL.revokeObjectURL(url)
// }


// var data = {senaArray}
// fileName = "my-download.json"

// let importSenaArray = () => {
//   var obj = JSON.parse(contacts)
//   return obj
// }





