const canvas = document.getElementById('canvas')
const ww = window.innerWidth
const wh = window.innerHeight

canvas.width = ww;
canvas.height = wh;

const ctx = canvas.getContext('2d')

const planets0 = [
  new Planet(30, 20000, 200, wh / 2 , 0, 0, 'yellow', 'black'),
  new Planet(30, 20000, ww -200, wh / 2, 0, 0, 'green', 'black'),
]

const planets1 = [
  new Planet(30, 270, 100, wh / 2 , 0, 1, 'blue', 'black'),
  new Planet(30, 270, 700 - 100, wh / 2, 0, -1, 'red', 'black'),
  new Planet(30, 270, 350, wh - 100, 1, 0, 'green', 'black'),
  new Planet(30, 270, 350, 100, -1, 0, 'yellow', 'black'),
]

const planets2 = [
  new Planet(30, 20000, 200, wh / 2 , 0, 4, 'yellow', 'black'),
  new Planet(30, 20000, ww -200, wh / 2, 0, -4, 'green', 'black'),
]

const planets3 = [
  new Planet(30, 3300, ww / 2, wh / 2 , 0, 0, 'yellow', 'orange'),
  new Planet(10, 1, ww / 2, wh / 2 + 200 , -4, 0, 'blue', 'cyan'),
]

const planets4 = [
  new Planet(30, 3300, ww / 2, wh / 2 , 0, 0, 'yellow', 'orange'),
  new Planet(10, 1, ww / 2, wh / 2 + 200 , -4, 0, 'blue', 'cyan'),
  new Planet(1, 0.1, ww / 2, wh / 2 + 215 , -3.6, 0, 'grey', 'black'),
]

const planets5 = [
  new Planet(30, 340, ww / 2, wh / 2 , (8 / 340), 0, 'yellow', 'orange'),
  new Planet(8, 8, ww / 2, wh / 2 + 320 , -1, 0, 'blue', 'cyan'),
  new Planet(1, 0.01, ww / 2, wh / 2 + 330 , 0, 0, 'grey', 'black'),
]

const planets6 = [
  new Planet(30, 100000, 200, wh / 2 , 0, 10, 'purple', 'black'),
  new Planet(30, 100000, ww -200, wh / 2, 0, -10, 'reds', 'black'),
]

const planets7 = [
  new Planet(
    6372797,
    5.9742 * Math.pow(10, 24),
    Math.pow(10, 9) / 2,
    Math.pow(10, 9) / 2,
    968 * (7.3477 / 5.9742 * Math.pow(10, -2)),
    0,
    'blue', 'cyan'
  ),
  new Planet(
    1738140, 
    7.3477 * Math.pow(10, 22),
    Math.pow(10, 9) / 2,
    Math.pow(10, 9) / 2 + 405696000,
    // -968,
    500,
    0,
    'grey', 'black'
  )
]

// const scale = Math.pow(10, 9) / ww;
const scale = 1

const hour = 3600
const day =  24 * hour
const month = 30 * day
const year = 12 * month

const callback = (system) => {
  const hist0 = system.planets[0].history
  const hist1 = system.planets[1].history
  
  var minDis = calcDis(hist0[0], hist1[0])
  for (let i = 1; i < hist0.length; i++) {
    minDis = Math.min(minDis, calcDis(hist0[i], hist1[i]))
  }
  console.log('the minimum dis is: ')
  console.log(minDis - system.planets[0].r)
  console.log(hist0.length)
}

const system = new System(planets4)

animate(0, day , 2, 100, 2000, callback)



function animate(time, endTime, step, calcCount, maxHistorySize, callback) {
  console.log(time / day)
  resetCanvas()
  // track(1)

  const dt = step / calcCount
  for (let i = 0; i < calcCount; i++) {
    // system.solveEuler(dt)
    system.solveMidpoint(dt)

    system.pushHistory(maxHistorySize)
  }
  

  system.drawHistory(scale)
  system.draw(scale)
  
  if ( time + step <= endTime ) {
    requestAnimationFrame(() => {animate(time + step, endTime, step, calcCount, maxHistorySize, callback)})
  } else {
    callback(system)
  }
}

function resetCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function track(planetIndex) {
  const planet = system.planets[planetIndex]
  ctx.translate(-planet.x + ww /2, -planet.y + wh / 2)
}