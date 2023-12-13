class MouseControls {
  constructor(planet) {
    this.type = 'follow'
    this.x = planet.x
    this.y = planet.y
    this.oldX = this.x
    this.oldY = this.y
    this.planet = planet
    this.#addListeners()
  }

  #addListeners() {
    this.mousemoveEvent = (event) => this.#followMouse(event)
    document.addEventListener('mousemove', this.mousemoveEvent)
  }

  removeListeners() {
    this.#endFollowMouse()
    document.removeEventListener('mousemove', this.mousemoveEvent)
  }

  #followMouse = (event) => {
    this.oldX = this.x
    this.oldY = this.y
    let {x, y} = canvasToSim(event.clientX, event.clientY)
    this.x = x
    this.y = y
  }

  #endFollowMouse() {
    let step = window.step
    this.planet.vx = (this.x - this.oldX) / step
    this.planet.vy = (this.y - this.oldY) / step
  }
}
