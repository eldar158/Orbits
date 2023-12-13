function getGravityForce(p, system) {
  const planets = system.planets
  const g = {x: 0, y: 0}
  for (let i = 0; i < planets.length; i++) {
    const f = calcGravity(p, planets[i], system.G)
    const a = calcAngle(p, planets[i], system.G)
    g.x += f * Math.sin(a)
    g.y += f * Math.cos(a)
  }
  return g
}

function calcGravity(a, b, G) {
  const dis = calcDis(a,b)
  if (dis < a.r || dis < b.r) return 0
  return a.m * b.m * G / Math.pow(dis, 2)
}

function calcGravtyEnergy(a, b, G) {
  const dis = calcDis(a,b)
  return - a.m * b.m * G / dis
}

function calcKineticEnergy(p) {
  return p.m * Math.pow(calcV(p), 2) / 2
}

function calcV(p) {
  return Math.hypot(p.vx, p.vy)
}

function calcDis(a, b) {
  return Math.hypot((b.x - a.x), (b.y - a.y))
}

function calcAngle(a, b) {
  return Math.atan2((b.x - a.x), (b.y - a.y))
}




function simToCanvas(x, y) {
  let {a, b, c, d, e, f} = ctx.getTransform()
  return {
    "x": a*x + b*y + e,
    "y": c*x + d*y + f,
  }
}

function canvasToSim(x, y) {
  let currentTransfrom = ctx.getTransform()
  let {a, b, c, d, e, f} = invertMatrix(currentTransfrom)
  return {
    "x": a*x + b*y + e,
    "y": c*x + d*y + f,
  }
}

function invertMatrix(matrix) {
  var det = matrix.a * matrix.d - matrix.b * matrix.c
  if (det === 0) console.error("Matrix is not invertible")
  return {
    a: matrix.d / det,
    b: -matrix.b / det,
    c: -matrix.c / det,
    d: matrix.a / det,
    e: (matrix.c * matrix.f - matrix.d * matrix.e) / det,
    f: (matrix.b * matrix.e - matrix.a * matrix.f) / det
  };
}
