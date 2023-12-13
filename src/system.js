class System {
  constructor(planets, gravityConstant = 1) {
    this.planets = planets
    this.G = gravityConstant
  }

  draw(scale) {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].draw(ctx, scale)
    }
  }

  drawHistory(scale) {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].drawHistory(ctx, scale)
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
  }

  solveMidpoint(step) {
    const mid = step / 2
    this.updateLocation(mid)
    this.updateVelocity(mid)
  }

  solveMidpoint2(step) {
    const mid = step / 2

    const s_a_arr = []
    for (let i = 0; i < this.planets.length; i++) {
      const p = this.planets[i]
      const s_f = getGravityForce(p, this)
      const s_ax = s_f.x / p.m
      const s_ay = s_f.y / p.m
      s_a_arr.push({x: s_ax, y: s_ay})
    }

    for (let i = 0; i < this.planets.length; i++) {
      const p = this.planets[i]
      p.x += mid * p.vx
      p.y += mid * p.vy
    }

    for (let i = 0; i < this.planets.length; i++) {
      const p = this.planets[i]

      const m_vx = p.vx + mid * s_a_arr[i].x
      const m_vy = p.vy + mid * s_a_arr[i].y

      const m_f = getGravityForce(p, this)
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

      if ( p.controls && p.controls.type === "follow" ) {
        p.x = p.controls.x
        p.y = p.controls.y
      } else {
        p.x += step * p.vx
        p.y += step * p.vy
      }
    }
  }

  updateVelocity(step) {
    for (let i = 0; i < this.planets.length; i++) {
      const p = this.planets[i]

      if ( p.controls) {
        switch (p.controls.type) {
          case "follow":
            break;
          case "force":
            const [fx, fy] = p.controls.getForce(p.controls)
            f.x += fx
            f.y += fy
            break;
        }
      } else {
        const f = getGravityForce(p, this)
        p.vx += step * f.x / p.m
        p.vy += step * f.y / p.m
      }
    }
  }

}