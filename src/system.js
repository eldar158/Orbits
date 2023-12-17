class System {
  constructor(planets, gravityConstant = 1, dragPlanets = true) {
    this.planets = planets
    this.G = gravityConstant
    if ( dragPlanets ) this.#addragPlanetListener()
  }
  
  #addragPlanetListener() {
    this.dragListener = (event) => { this.#dragPlanetListener(event) }
    this.endDragListener = (event) => { this.#endDragPlanetListener(event) }
    document.addEventListener('mousedown', this.dragListener)
    document.addEventListener('mouseup', this.endDragListener)
  }

  removeListeners() {
    document.removeEventListener('mousedown', this.dragListener)
    document.removeEventListener('mouseup', this.endDragListener)
  }

  #dragPlanetListener(event) {
    let [canvasX, canvasY] = [event.clientX, event.clientY]
    let [x, y] = canvasToSim(canvasX, canvasY)
    this.selectedPlanet = this.planets.find(p => p.isInPlanet(x, y))
    if ( this.selectedPlanet ) this.selectedPlanet.controls = new MouseControls(this.selectedPlanet, canvasX, canvasY)
  }

  #endDragPlanetListener() {
    if ( this.selectedPlanet ) {
      this.selectedPlanet.controls.removeListeners()
      this.selectedPlanet.controls = undefined
    }
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
      p.x += step * p.vx
      p.y += step * p.vy
    }
  }

  updateVelocity(step) {
    for (let i = 0; i < this.planets.length; i++) {
      const p = this.planets[i]
      const F = getGravityForce(p, this)

      if ( p.controls) {
        const [fx, fy] = p.controls.getForce(p.controls)
        F.x += fx
        F.y += fy
      }

      p.vx += step * F.x / p.m
      p.vy += step * F.y / p.m
    }
  }

}