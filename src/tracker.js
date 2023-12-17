class Tracker {
  constructor(system, keyboardControls = true) {
    this.objects = system.planets
    this.keyboardControls = keyboardControls
    this.trackedObject = null
    this.#addTrackingListeners()
  }

  getTrackingCenter() {
    if ( this.trackedObject ) return [this.trackedObject.x, this.trackedObject.y]
    return [window.innerWidth / 2, window.innerHeight / 2]
  }

  #changeTracking(index) {
    if ( index === -1 ) return this.trackedObject = null
    this.trackedObject = this.objects[index]
    if ( this.keyboardControls ) {
      if ( this.activeControls ) this.activeControls.removeListeners()
      this.activeControls = new KeyboardControls(this.trackedObject.m / 10)
      this.trackedObject.controls = this.activeControls
    }
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