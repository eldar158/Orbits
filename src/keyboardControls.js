class KeyboardControls {
  constructor(force) {
    this.type = 'force'
    this.forward = false
    this.left = false
    this.right = false
    this.reverse = false
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

  #useKeys = (event, value) => {
    switch (event.key) {
      case 'ArrowLeft':
        this.left = value
        break
      case 'ArrowRight':
        this.right = value
        break
      case 'ArrowUp':
        this.forward = value
        break
      case 'ArrowDown':
        this.reverse = value
        break
    }
  }
}
