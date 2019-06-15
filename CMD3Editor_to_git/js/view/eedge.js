// electo circuit edge

class EEdge {
  constructor(controller, from, to) {
    this.self = this
    this.controller = controller
    this.from = from
    this.to = to
    this.strideSize = window.appConfig.view.strideSize
    this.prepareVisVertexCoords(from, to)
    this.element = null
    this.isVertical = () => this.from.x === this.to.x

    this.makePath()
  }

  makePath() {
    this.path = this.isEmptyEdge() ? this.getEmptyPath(this) : this.getPath(this)

    if (this.element != undefined && this.element.invPol) {
      this.path.rotate(180)
    }

    this.path.onClick = event => this.click(this.self, event) //, event.stopPropagation()
    this.path.onDoubleClick = event => this.newElemClick(this.self) //, event.stopPropagation()
    //this.path.onMouseEnter = event => this.setFocus(this.self), event.stopPropagation()
    this.path.onMouseEnter = event => this.mouseOver(event)
    this.path.onMouseLeave = event => this.leaveFocus(this.self) //, event.stopPropagation()
  }

  getPath(eedge) {
    this.path = this.element.getPath(eedge)

    if (this.element.needSVGAdjust()) {
      this.path.position.x = eedge.vis_from.x
      this.path.position.y = eedge.vis_from.y
      if (this.isVertical()) {
        this.path.rotate(90)
        this.path.position.y = this.path.position.y + 20
      } else {
        this.path.position.x = this.path.position.x + 20
      }
    }
    return this.path
  }

  getEmptyPath(eedge) {
    let empty = new Path.Line({
      from: [eedge.vis_from.x, eedge.vis_from.y],
      to: [eedge.vis_to.x, eedge.vis_to.y],
      strokeColor: "#EEEEEE",
      strokeWidth: 7,
      fillColor: "black",
    })
    empty.sendToBack()
    return empty
  }

  setElement(element) {
    this.path.selected = false
    this.path.setVisible(false)
    delete this.path
    this.element = element
    this.makePath()
    this.path.setVisible(true)
  }

  isEmptyEdge() {
    return this.element === null
  }

  prepareVisVertexCoords(from, to) {
    this.vis_from = {
      x: from.x * this.strideSize + 5,
      y: from.y * this.strideSize + 5,
    }
    this.vis_to = {
      x: to.x * this.strideSize + 5,
      y: to.y * this.strideSize + 5,
    }
  }

  newElemClick(edge) {
    if (this.isEmptyEdge()) this.controller.addNewElemPhase1(edge)
  }

  click(edge, event) {
    this.setFocus(edge)
    if (event.event.ctrlKey) {
      if (this.isEmptyEdge()) {
        this.controller.placeWire(edge)
      } else {
        this.controller.removeEdge(edge)
      }
    }
    if (event.event.shiftKey) {
      this.controller.showElemProp(edge)
    }
  }

  redraw(force) {
    if (force) this.setElement(this.element)
    this.path.position = [
      (this.vis_from.x + this.vis_to.x) / 2,
      (this.vis_from.y + this.vis_to.y) / 2,
    ]
    this.path.strokeColor = this.element.getColor()
  }

  erase() {
    this.setElement(null)
  }

  setFocus(edge) {
    if (!this.isEmptyEdge()) {
      // edge.path._strokeColor = edge.path.strokeColor
      // edge.path.strokeColor = 'green'
      edge.path.selected = true
      this.controller.setCurrentEdge.bind(this.controller)(edge)
    }
  }

  leaveFocus(edge) {
    if (!this.isDragged()) {
      document.body.style.cursor = ""
      // edge.path.strokeColor = (this.element === null ? edge.path._strokeColor || '#EEEEEE' : this.element.getColor())
      edge.path.selected = false
      this.controller.setCurrentEdge.bind(this.controller)(undefined)
    }
  }

  mouseOver(event) {
    document.body.style.cursor = "pointer"
  }

  isDragged() {
    return this._dragged
  }
}
