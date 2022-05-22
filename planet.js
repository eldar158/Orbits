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

  update(planets, dt) {
    const f = getGravityForce(this, planets)
    if (this.controls) {
      const [fx, fy] = this.controls.getForce(this.controls)
      f.x += fx
      f.y += fy
    }
    this.ax = f.x / this.m
    this.ay = f.y / this.m
    
    this.#useOiler(dt)
    // this.#useODE45(dt)
  }

  pushHistory(maxHistorySize) {
    this.history.push({x: this.x, y: this.y})
    if ( this.history.length > maxHistorySize ) this.history.splice(0,1)
  }

  #useOiler(dt) {
    this.vx += this.ax * dt
    this.vy += this.ay * dt
  
    this.x += this.vx * dt
    this.y += this.vy * dt
  }

  #useODE45(dt) {
    this.x += this.vx * dt
    this.y += this.vy * dt

    this.vx += this.ax * dt
    this.vy += this.ay * dt
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