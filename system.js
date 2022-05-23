class System {
  constructor(planets) {
    this.planets = planets
  }

  draw() {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].draw(ctx)
    }
  }

  drawHistory() {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].drawHistory(ctx)
    }
  }

  pushHistory(maxHistorySize) {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].pushHistory(maxHistorySize)
    }
  }

  solveEuler(step) {
    this.updateLocation(step)
    this.updateVelocity(step)
    this.updateAcceleration()
  }

  // solveMidpoint(dt) {
  //   const f = this.#getForce(planets)
  //   this.ax = f.x / this.m
  //   this.ay = f.y / this.m

  //   const mid = dt / 2 


  //   const m_vx = this.vx + mid * this.ax
  //   const m_vy = this.vy + mid * this.ay
  //   const m_x  = this.x +  mid * this.vx
  //   const m_y  = this.y +  mid * this.vy

  //   this.vx += dt * this.ax
  //   this.vy += dt * this.ay
  //   this.x += dt * m_vx
  //   this.y += dt * m_vy
  // }

  updateLocation(step) {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].x += step * this.planets[i].vx
      this.planets[i].y += step * this.planets[i].vy
    }
  }

  updateVelocity(step) {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].vx += step * this.planets[i].ax
      this.planets[i].vy += step * this.planets[i].ay
    }
  }

  updateAcceleration() {
    const planets = this.planets
    var f
    for (let i = 0; i < planets.length; i++) {
      const p = planets[i]
      f = getGravityForce(p, planets)
      if (p.controls) {
        const [fx, fy] = p.controls.getForce(p.controls)
        f.x += fx
        f.y += fy
      }
      p.ax = f.x / p.m
      p.ay = f.y / p.m
    }
  }

}