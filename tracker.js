class Tracker {
  constructor(objects) {
    this.objects = objects
    this.trackedIndex = -1 // -1 means none
    this.#addTrackingListeners()
  }

  track() {
    let dx = 0, dy = 0

    if ( this.trackedIndex !== -1 ) {
      let trackedObject = this.objects[this.trackedIndex]
      if ( trackedObject ) {
        dx = -trackedObject.x + window.innerWidth / 2
        dy = -trackedObject.y + window.innerHeight / 2
      }
    }

    ctx.transform(1, 0, 0, 1, dx, dy);
  }

  #changeTracking(index) {
    this.trackedIndex = index
  }

  #addTrackingListeners() {
    document.onkeydown = (event) => this.#readKey(event)
  }

  #readKey(event) {
    let code = event.code
    let isDigit = code.slice(0,5) === "Digit"
    if ( !isDigit ) this.#changeTracking(-1)
    let digit = parseInt(code.slice(5,6))
    if (digit === 0 || digit > this.objects.length) return this.#changeTracking(-1)
    this.#changeTracking(digit - 1)
  }
}