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

  // solveEuler(step) {
  //   const planets = this.planets
  //   var f
  //   for (let i = 0; i < planets.length; i++) {
  //     const p = planets[i]
  //     f = getGravityForce(p, planets)
  //     if (p.controls) {
  //       const [fx, fy] = p.controls.getForce(p.controls)
  //       f.x += fx
  //       f.y += fy
  //     }
  //     p.x  += step * p.vx
  //     p.y  += step * p.vy
  //     p.vx += step * p.ax
  //     p.vy += step * p.ay
  //     p.ax =  f.x / p.m
  //     p.ay =  f.y / p.m
  //   }
  // }

  solveMidpoint(step) {
    const mid = step / 2 

    for (let i = 0; i < this.planets.length; i++) {
      const p = this.planets[i]
      p.x += mid * p.vx
      p.y += mid * p.vy
    }

    for (let i = 0; i < this.planets.length; i++) {
      const p = this.planets[i]

      const m_vx = p.vx + mid * p.ax
      const m_vy = p.vy + mid * p.ay

      const m_f = getGravityForce(p, this.planets)
      const m_ax = m_f.x / p.m
      const m_ay = m_f.y / p.m

      p.x -=  mid * p.vx //remove back to add using midpoint
      p.y -=  mid * p.vy

      p.x  += step * m_vx
      p.y  += step * m_vy

      p.vx += step * m_ax
      p.vy += step * m_ay
    }
  }

  updateLocation(step) {
    for (let i = 0; i < this.planets.length; i++) {
      const p = this.planets[i]
      p.x += step * p.vx
      p.y += step * p.vy
    }
  }

  updateVelocity(step) {
    for (let i = 0; i < this.planets.length; i++) {
      const p = this.planets[i]
      p.vx += step * p.ax
      p.vy += step * p.ay
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