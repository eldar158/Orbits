class Camera {
  constructor(system, initZoom) {
    this.tracker = new Tracker(system)
    this.zoom = initZoom

    this.#addZoomListeners()
  }

  setView() {
    let width = window.innerWidth
    let height = window.innerHeight
    let zoom = this.zoom
    let tCenter = this.tracker.getTrackingCenter()

    let xCenterTranslate = width * (1 - zoom) / 2
    let yCenterTranslate = height * (1 - zoom) / 2
    
    // the transform function will change (x,y) to (ax + cy + e, bx + dy + f)
    let transformMatrix = new DOMMatrix([
      zoom,
      0,
      0,
      zoom,
      xCenterTranslate + (width  / 2 - tCenter[0]) * zoom,
      yCenterTranslate + (height / 2 - tCenter[1]) * zoom,
    ])

    ctx.setTransform(transformMatrix);
  }


  #addZoomListeners() {
    document.addEventListener('keydown', (event) => this.#readZoom(event))
    document.addEventListener("wheel", (event) => this.#readZoom(event))
  }

  #readZoom(event) {
    if ( event.deltaY ) return this.#changeZoom(-1 * 0.02 * event.deltaY)
    
    let code = event.code
    let zoomKeys = ["NumpadAdd", "Equal"]
    let unZommKeys = ["NumpadSubtract", "Minus"]

    if (zoomKeys.includes(code)) return this.#changeZoom(1)
    if (unZommKeys.includes(code)) return this.#changeZoom(-1)
  }

  #changeZoom = (scale) => {
    let speed = scale * this.zoom / 20
    let newZoom = this.zoom + speed
    if ( newZoom < Math.pow(10, -8)  || newZoom > Math.pow(10, 8) ) return
    this.zoom = newZoom
  }
}

