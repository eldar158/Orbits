class Planet {
  constructor (radius, mass, x, y, vx=0, vy=0, color="blue", surfaceColor='black', controlType, controlForce) {
    this.r = radius
    this.m = mass
    this.color = color
    this.surfaceColor = surfaceColor
    
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.ax = 0
    this.ay = 0

    this.history = []

    if (controlType !== 'none') {
      this.controls = new Controls(controlType, controlForce)
    }
  }

  update(planets) {
    const f = getGravityForce(this, planets)
    if (this.controls) {
      const [fx, fy] = this.controls.getForce(this.controls)
      f.x += fx
      f.y += fy
    }
    
    // Oiler solver
    this.ax = g.x / this.m
    this.ay = g.y / this.m

    this.vx += this.ax
    this.vy += this.ay

    this.x += this.vx
    this.y += this.vy
    // Oiler solver


    this.history.push({x: this.x, y: this.y})
    if ( this.history.length > 500 ) this.history.splice(0,1)
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