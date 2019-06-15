class UIField {
  constructor(appConfig, bsn, CETypes) {
    this.CETypes = CETypes
    this.uiVxs = []
    this.bsn = bsn
    this.view = paper.project.view
  }

  injectController(controller) {
    this.controller = controller
    this.initModal()
  }

  reset() {
    this.initView()
  }

  drawField(mx, my, scale) {
    _(my).times(y =>
      _(mx).times(x => {
        let pt = new Path.Circle(new Point(x * scale + 5, y * scale + 5), 4)
        pt.strokeColor = "black"
      }),
    )
  }

  initView(appConfig) {
    if (appConfig !== undefined) this.appConfig = appConfig
    _(this.appConfig.nodes_row).times(y => {
      ;(this.uiVxs[y] = []),
        _(this.appConfig.nodes_col).times(x => {
          this.uiVxs[y][x] = {}
          if (x < this.appConfig.nodes_col - 1)
            this.uiVxs[y][x].left = new EEdge(
              this.controller,
              { x, y },
              { x: x + 1, y },
              this.appConfig,
            )
          if (y < this.appConfig.nodes_row - 1)
            this.uiVxs[y][x].down = new EEdge(
              this.controller,
              { x, y },
              { x, y: y + 1 },
              this.appConfig,
            )
        })
    })
    this.drawField(
      this.appConfig.nodes_col,
      this.appConfig.nodes_row,
      this.appConfig.view.strideSize,
    )
    this.listenToKeys()
    const undoButton = document.getElementById("undoButton")
    const redoButton = document.getElementById("redoButton")
    undoButton.addEventListener("click", () => this.controller.undoManager.undo())
    redoButton.addEventListener("click", () => this.controller.undoManager.redo())
    const resetButton = document.getElementById("resetButton")
    resetButton.addEventListener("click", () => this.controller.reset())
    const calcButton = document.getElementById("calculateButton")
    calcButton.addEventListener("click", () => fileOps.calculateSchema())
  }

  listenToKeys() {
    this.view.onKeyDown = this.handleKeyCommands.bind(this)
    this.view.onMouseMove = this.onMouseMove.bind(this)
  }

  stopKeysListen() {
    this.view.onKeyDown = undefined
    this.view.onMouseMove = undefined
  }

  onMouseMove(event) {
    if (event.event.buttons === 1) {
      let uielem = this.controller.getCurrentEdge()
      if (uielem !== undefined) {
        this.enterDraggingItem(uielem)
        uielem.path.position = event.point
      }
    } else {
      this.leaveDraggingItem(event.point)
    }
  }

  enterDraggingItem(item) {
    item._dragged = true
    this.draggedItem = item
  }

  leaveDraggingItem(dropPoint) {
    if (this.draggedItem !== undefined) {
      this.draggedItem.redraw()
      let element = this.draggedItem.element
      let uiedge = this.draggedItem
      let newEdge = this.getPredictedEdgeByPoint(dropPoint)

      this.draggedItem._dragged = undefined
      this.draggedItem.leaveFocus.bind(this.draggedItem)(this.draggedItem)
      this.draggedItem = undefined

      this.controller.removeEdge(uiedge)
      this.controller.createNewElement(element.getProps(), this.controller.getPureEdge(newEdge))
    }
  }

  getPredictedEdgeByPoint(ipos) {
    let pos = { x: ipos.x, y: ipos.y }

    pos.xc = pos.x / appConfig.view.strideSize
    pos.yc = pos.y / appConfig.view.strideSize

    pos.xt = Math.trunc(pos.xc)
    pos.yt = Math.trunc(pos.yc)
    pos.xr = Math.round(pos.xc)
    pos.yr = Math.round(pos.yc)
    pos.xb = pos.xt + 1
    pos.yb = pos.yt + 1

    pos.xd = Math.min(pos.xb - pos.xc, pos.xc - pos.xt)
    pos.yd = Math.min(pos.yb - pos.yc, pos.yc - pos.yt)

    let hor = {
      from: {
        x: pos.xt,
        y: pos.yr,
      },
      to: {
        x: pos.xb,
        y: pos.yr,
      },
    }

    let ver = {
      from: {
        x: pos.xr,
        y: pos.yt,
      },
      to: {
        x: pos.xr,
        y: pos.yb,
      },
    }

    return pos.yd < pos.xd ? hor : ver
  }

  handleKeyCommands(event) {
    switch (event.character) {
      case "d":
        this.controller.removeEdge(this.controller.uiEdge)
        break
      case "r":
        this.controller.invertPole()
        break
    }
  }

  initModal() {
    const myModal = document.getElementById("newElement")
    this.myModalInstance = new bsn.Modal(myModal, {
      backdrop: "static",
      keyboard: false,
    })

    const showElem = document.getElementById("showElementProp")
    this.showElemPropInstance = new bsn.Modal(showElem, {
      backdrop: "static",
      keyboard: false,
    })

    let btnSaveNewElement = document.getElementById("saveNewElement")
    // simply attach a click handler to it
    btnSaveNewElement.addEventListener(
      "click",
      this.controller.newElementDialogSave.bind(this.controller),
      false,
    )

    let btnSaveElement = document.getElementById("saveElement")
    // simply attach a click handler to it
    btnSaveElement.addEventListener(
      "click",
      this.controller.elementDialogSave.bind(this.controller),
      false,
    )

    let btnShowElemCancel = document.getElementById("showElemCancel")
    btnShowElemCancel.addEventListener("click", this.hideNewElemModal.bind(this), false)
    let btnNewElemCancel = document.getElementById("newElemCancel")
    btnNewElemCancel.addEventListener("click", this.hideNewElemModal.bind(this), false)
  }

  hideNewElemModal() {
    this.myModalInstance.hide()
    this.listenToKeys()
  }

  showNewElmeModal() {
    this.myModalInstance.show()
  }

  hideShowElemModal() {
    this.showElemPropInstance.hide()
    this.listenToKeys()
  }

  showElemProp(edge) {
    if (
      edge == undefined ||
      edge.element == undefined ||
      edge.element.constructor.getUI == undefined
    )
      return
    this.currentElemUI = edge.element.constructor.getUI(
      this.myModalInstance,
      this.showElemPropInstance,
    )
    this.currentElemUI.showElement(edge.element)
  }

  getEdgeByVxCoords(from, to) {
    if (to.x - from.x > 1 || to.y - from.y > 1) throw Error("to far edge")
    let vx = this.uiVxs[from.y][from.x]
    if (to.x !== from.x) return vx.left
    if (to.y !== from.y) return vx.down
  }

  getSelectedType() {
    return CETypes.find(o => {
      let e = document.getElementById("type_" + o.type)
      return e != null && e != undefined && e.checked
    }).clazz
  }

  getNewElemDialogResult() {
    let type = this.getSelectedType()
    const ui = type.getUI(this.myModalInstance, this.showElemPropInstance)
    return ui.getNewResult(type)
  }
  getShowElemDialogResult() {
    return this.currentElemUI.getEditResult()
  }
}

function theClosest(x, y, A, B, C) {
  let a1 = A + 1 / 2 * C
  let b1 = B
  let a2 = A
  let b2 = B + 1 / 2 * C
  let a3 = a1
  let b3 = b1 + 1 / 2 * C
  let a4 = a2 + 1 / 2 * C
  let b5 = b2
  let l1 = sqrt((x - a1) * (x - a1) + (y - b1) * (y - b1))
  let l2 = sqrt((x - a2) * (x - a2) + (y - b2) * (y - b2))
  let l3 = sqrt((x - a3) * (x - a3) + (y - b3) * (y - b3))
  let l4 = sqrt((x - a4) * (x - a4) + (y - b4) * (y - b4))

  let m = min(l1, l2, l3, l4)

  if (l1 == m) {
    return [A, B, A + C, B]
  }

  if (l2 == m) {
    return [A, B, A, B + C]
  }

  if (l3 == m) {
    return [A + C, B, A + C, B + C]
  }

  if (l1 == m) {
    return [A, B + C, A + C, B + C]
  }
}
