const canvas = document.getElementById('canvas')
const ww = window.innerWidth
const wh = window.innerHeight

canvas.width = ww;

const ctx = canvas.getContext('2d')

const planets = [
  new Planet(30, 300, 100, wh / 2 , 0, 1, 'blue', 'black'),
  new Planet(30, 300, 700 - 100, wh / 2, 0, -1, 'red', 'black'),
  new Planet(30, 300, 350, wh - 100, 1, 0, 'green', 'black'),
  new Planet(30, 300, 350, 100, -1, 0, 'yellow', 'black'),
]

// const planets = [
//   new Planet(30, 2950, 200, wh / 2 , 0, 2, 'blue', 'black'),
//   new Planet(30, 2950, ww -200, wh / 2, 0, -2, 'red', 'black'),
// ]


animate()


function animate() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; // clears the canvas as well

  for (let i = 0; i < planets.length; i++) {
    planets[i].update(planets)
  }
  for (let i = 0; i < planets.length; i++) {
    planets[i].drawHistory(ctx)
  }
  for (let i = 0; i < planets.length; i++) {
    planets[i].draw(ctx)
  }
  
  requestAnimationFrame(animate)
}