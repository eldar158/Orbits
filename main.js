const canvas = document.getElementById('canvas')
const ww = window.innerWidth
const wh = window.innerHeight

canvas.width = ww;

const ctx = canvas.getContext('2d')

// const planets = [
//   new Planet(30, 270, 100, wh / 2 , 0, 1, 'blue', 'black'),
//   new Planet(30, 270, 700 - 100, wh / 2, 0, -1, 'red', 'black'),
//   new Planet(30, 270, 350, wh - 100, 1, 0, 'green', 'black'),
//   new Planet(30, 270, 350, 100, -1, 0, 'yellow', 'black'),
// ]

// const planets = [
//   new Planet(30, 20000, 200, wh / 2 , 0, 4, 'yellow', 'black'),
//   new Planet(30, 20000, ww -200, wh / 2, 0, -4, 'green', 'black'),
// ]

// const planets = [
//   new Planet(30, 3300, ww / 2, wh / 2 , 0, 0, 'yellow', 'black'),
//   new Planet(10, 1, ww / 2, wh / 2 + 200 , -4, 0, 'blue', 'cyan'),
// ]

const planets = [
  new Planet(30, 3300, ww / 2, wh / 2 , 0, 0, 'yellow', 'black'),
  new Planet(10, 1, ww / 2, wh / 2 + 200 , -4, 0, 'blue', 'cyan'),
  new Planet(1, 0.1, ww / 2, wh / 2 + 215 , -3.6, 0, 'grey', 'black'),
]


animate(1, 1000, 500)


function animate(step, calcCount, maxHistorySize) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; // clears the canvas as well
  // ctx.translate(-planets[1].x + planets[0].x, -planets[1].y + planets[0].y)

  canvas.offsetTop

  const dt = step / calcCount
  for (let i = 0; i < calcCount; i++) {
    for (let i = 0; i < planets.length; i++) {
      planets[i].update(planets, dt)
    }
  }

  for (let i = 0; i < planets.length; i++) {
    planets[i].pushHistory(maxHistorySize)
    planets[i].drawHistory(ctx)
  }
  for (let i = 0; i < planets.length; i++) {
    planets[i].draw(ctx)
  }
  
  requestAnimationFrame(() => {animate(step, calcCount, maxHistorySize)})
}