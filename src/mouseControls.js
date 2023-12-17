class MouseControls {
  constructor(planet, mouseX, mouseY) {
    this.mouseX = mouseX
    this.mouseY = mouseY
    this.planet = planet
    this.#addListeners()
  }

  updateMouse(mouseX, mouseY) {
    this.mouseX = mouseX
    this.mouseY = mouseY
  }

  #addListeners() {
    this.mousemoveEvent = (event) => this.#followMouse(event)
    document.addEventListener('mousemove', this.mousemoveEvent)
  }

  removeListeners() {
    document.removeEventListener('mousemove', this.mousemoveEvent)
  }

  #followMouse = (event) => {
    this.mouseX = event.clientX
    this.mouseY = event.clientY
  }
  
  getForce() {
    let dampner = 2
    let [planetX, planetY] = simToCanvas(this.planet.x, this.planet.y)
    let deltaX = this.mouseX - planetX
    let deltaY = this.mouseY - planetY
    let fx = this.planet.m * (deltaX  - this.planet.vx * dampner)
    let fy = this.planet.m * (deltaY  - this.planet.vy * dampner)
    return [fx, fy]
  }
}
