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

    this.history = []

    if (controlType !== 'none') {
      this.controls = new Controls(controlType, controlForce)
    }
  }

  // constructor(planet) {
  //   this.r = planet.r
  // }
  
  pushHistory(maxHistorySize) {
    this.history.push({x: this.x, y: this.y})
    if ( this.history.length > maxHistorySize ) this.history.splice(0,1)
  }

  draw (ctx, scale) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.surfaceColor
    ctx.arc(this.x / scale, this.y / scale, this.r / scale, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke()
  }

  drawHistory (ctx, scale) {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    for (let i = 0; i < this.history.length - 1; i++) {
      ctx.moveTo(this.history[i].x / scale, this.history[i].y / scale)
      ctx.lineTo(this.history[i+1].x / scale, this.history[i+1].y / scale)
    }
    ctx.stroke()
  }

}