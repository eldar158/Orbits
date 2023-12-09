class Tracker {
  constructor(system) {
    this.objects = system.planets
    this.trackedIndex = -1 // -1 means none
    this.#addTrackingListeners()
  }

  getTrackingCenter() {
    let [dx, dy] = [window.innerWidth / 2, window.innerHeight / 2]
    if ( this.trackedIndex !== -1 ) {
      let trackedObject = this.objects[this.trackedIndex]
      if ( trackedObject ) {
        dx = trackedObject.x 
        dy = trackedObject.y
      }
    }
    return [dx,dy]
  }

  #changeTracking(index) {
    this.trackedIndex = index
  }

  #addTrackingListeners() {
    document.addEventListener('keydown', (event) => this.#readTracking(event))
  }

  #readTracking(event) {
    let code = event.code
    let isDigit = code.slice(0,5) === "Digit"
    if ( !isDigit ) return
    let digit = parseInt(code.slice(5,6))
    if (digit === 0 || digit > this.objects.length) return this.#changeTracking(-1)
    this.#changeTracking(digit - 1)
  }
}