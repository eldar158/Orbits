class MouseControls {
  constructor(planet) {
    this.type = "follow"
    this.x = planet.x
    this.y = planet.y
    this.#addListener()
  }

  #addListener() {
    this.mousemoveEvent = (event) => this.#followMouse(event)
    document.addEventListener('mousemove', this.mousemoveEvent)
  }

  removeListener() {
    document.removeEventListener('mousemove', this.mousemoveEvent)
  }

  #followMouse = (event) => {
    let {x, y} = canvasToSim(event.clientX, event.clientY)
    this.x = x
    this.y = y
  }
}
