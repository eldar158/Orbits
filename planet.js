class Planet {
  constructor (radius, mass, x, y, vx=0, vy=0, color="blue", surfaceColor='black') {
    this.r = radius
    this.m = mass
    this.color = color
    this.surfaceColor = surfaceColor
    
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy

    this.history = []
  }

  update(planets) {
    
    var [fx, fy] = [0,0]
    for (let i = 0; i < planets.length; i++) {
      const planet = planets[i]

      const f = calcGravity(this, planet)
      const a = calcAngle(this, planet)

      fx += f * Math.sin(a)
      fy += f * Math.cos(a)
    }

    this.ax = fx / this.m
    this.ay = fy / this.m

    this.vx += this.ax
    this.vy += this.ay

    this.x += this.vx
    this.y += this.vy

    this.history.push({x: this.x, y: this.y})
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.surfaceColor
    
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    
    ctx.fill();
    ctx.stroke()
  }

  drawHistory (ctx) {
    ctx.beginPath()
    ctx.strokeStyle = this.color

    for (let i = 0; i < this.history.length - 1; i++) {
      ctx.moveTo(this.history[i].x, this.history[i].y)
      ctx.lineTo(this.history[i+1].x, this.history[i+1].y)
    }

    ctx.stroke()
  }

}