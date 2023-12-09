class Camera {
  constructor(system) {
    this.tracker = new Tracker(system)
    this.zoom = 1

    this.#addZoomListeners()
  }

  setView() {
    let width = window.innerWidth
    let height = window.innerHeight
    let zoom = this.zoom
    let tCenter = this.tracker.getTrackingCenter()

    let xCenterTranslate = width * (1 - zoom) / 2
    let yCenterTranslate = height * (1 - zoom) / 2

    let transformParams = [
      zoom,
      0,
      0,
      zoom,
      xCenterTranslate + (width  / 2 - tCenter[0]) * zoom,
      yCenterTranslate + (height / 2 - tCenter[1]) * zoom,
    ]

    // the transform will function will change (x,y) to (ax + cy + e, bx + dy + f)
    ctx.transform(...transformParams);
  }


  #addZoomListeners() {
    document.addEventListener('keydown', (event) => this.#readZoom(event))
  }

  #readZoom(event) {
    let code = event.code

    let zoomKeys = ["NumpadAdd", "Equal"]
    let unZommKeys = ["NumpadSubtract", "Minus"]

    if (zoomKeys.includes(code)) this.#changeZoom(1)
    if (unZommKeys.includes(code)) this.#changeZoom(-1)
  }

  #changeZoom = (dir) => {
    let speed = this.zoom / 20
    let newZoom = this.zoom + speed * dir
    if ( newZoom < Math.pow(10, -8)  || newZoom > Math.pow(10, 8) ) return
    this.zoom = newZoom
  }
}

