class Planet {
  constructor (radius, mass, x, y, vx=0, vy=0, color="blue", surfaceColor='black', maxHistorySize=-1, controlType, controlForce) {
    this.r = radius
    this.m = mass
    this.color = color
    this.surfaceColor = surfaceColor
    
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy

    this.maxHistorySize = maxHistorySize
    this.history = []

    if (controlType && controlType !== 'none') {
      this.controls = new Controls(controlType, controlForce)
    }
  }

  isInPlanet(x, y) {
    let distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2)
    return distance <= this.r
  }
  
  pushHistory(maxHistorySize) {
    let max = this.maxHistorySize === -1 ? maxHistorySize : this.maxHistorySize
    this.history.push({x: this.x, y: this.y})
    if ( this.history.length > max ) this.history.splice(0,1)
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.surfaceColor
    // ctx.lineWidth = 1000000
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
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