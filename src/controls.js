class Controls {
  constructor(type, force) {
    this.forward = false
    this.left = false
    this.right = false
    this.reverse = false
    this.force = force

    switch (type) {
      case 'keys':  
        this.#addKeyboardListeners();
        break;
      case 'dummy':
        this.forward=true
        break;
    }
  }

  getForce() {
    const fyp = this.reverse ? this.force : 0 // y axis is flipped
    const fym = this.forward ? this.force : 0
    const fxp = this.right ? this.force : 0
    const fxm = this.left ? this.force : 0

    return [fxp - fxm, fyp - fym]
  }

  #addKeyboardListeners() {
    document.onkeydown = (event) => this.#useKeys(event, true)
    document.onkeyup   = (event) => this.#useKeys(event, false)
  }

  #useKeys = (event, value) => {
    switch (event.key) {
      case "ArrowLeft":
        this.left = value
        break;
      case "ArrowRight":
        this.right = value
        break;
      case "ArrowUp":
        this.forward = value
        break;
      case "ArrowDown":
        this.reverse = value
        break;
    }
  }
}


