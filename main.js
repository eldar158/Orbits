const canvas = document.getElementById('canvas')
const ww = window.innerWidth
const wh = window.innerHeight

canvas.width = ww;

const ctx = canvas.getContext('2d')

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
  new Planet(30, 3300, ww / 2, wh / 2 , 0, 0, 'yellow', 'black'),
  new Planet(10, 1, ww / 2, wh / 2 + 200 , -4, 0, 'blue', 'cyan'),
]

const planets4 = [
  new Planet(30, 3300, ww / 2, wh / 2 , 0, 0, 'yellow', 'black'),
  new Planet(10, 1, ww / 2, wh / 2 + 200 , -4, 0, 'blue', 'cyan'),
  new Planet(1, 0.1, ww / 2, wh / 2 + 215 , -3.6, 0, 'grey', 'black'),
]

const system = new System(planets2)


animate(1, 1000, 100)


function animate(step, calcCount, maxHistorySize) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // ctx.translate(
  // -planets[1].x + planets[0].x, -planets[1].y + planets[0].y
  // )

  const dt = step / calcCount
  for (let i = 0; i < calcCount; i++) {
    system.solveEuler(dt)
  }

  system.pushHistory(maxHistorySize)
  system.drawHistory()
  system.draw()
  
  requestAnimationFrame(() => {animate(step, calcCount, maxHistorySize)})
}