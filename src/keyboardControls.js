class KeyboardControls {
  constructor(force) {
    this.left = false
    this.right = false
    this.up = false
    this.down = false
    this.force = force

    this.#addListeners()
  }

  #addListeners() {
    this.keydownListener = (event) => this.#useKeys(event, true)
    this.keyupListener = (event) => this.#useKeys(event, false)
    document.addEventListener('keydown', this.keydownListener)
    document.addEventListener('keyup', this.keyupListener)
  }

  removeListeners() {
    document.removeEventListener('keydown', this.keydownListener)
    document.removeEventListener('keyup', this.keyupListener)
  }

  getForce() {
    let fx = this.force * (+ this.right - this.left)
    let fy = this.force * (- this.up + this.down)
    return [fx, fy]
  }

  #useKeys = (event, value) => {
    switch (event.key) {
      case 'ArrowLeft':
        this.left = value
        break
      case 'ArrowRight':
        this.right = value
        break
      case 'ArrowUp':
        this.up = value
        break
      case 'ArrowDown':
        this.down = value
        break
    }
  }
}
