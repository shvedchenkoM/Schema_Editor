class SchemaController {
  constructor(model, uiField) {
    this.model = model
    this.uiField = uiField
    this.model.subscribe(this.onModelUpdated.bind(this))
    this.undoManager = new UndoManager()
    this.subscribers = []
  }

  onModelUpdated(args) {
    if (args.addedElement != undefined) {
      const newEdge = args.addedElement.edge
      const elem = args.addedElement.element
      let uiEdge = this.uiField.getEdgeByVxCoords(newEdge.from, newEdge.to)
      uiEdge.setElement(elem)
      if (uiEdge !== undefined) uiEdge.redraw.bind(uiEdge)(false)
    }

    if (args.removedEdge !== undefined) {
      let uiEdge = this.uiField.getEdgeByVxCoords(args.removedEdge.from, args.removedEdge.to)
      if (uiEdge !== undefined) uiEdge.erase()
    }

    if (args.updated !== undefined) {
      const edge = args.updated.edge
      let uiEdge = this.uiField.getEdgeByVxCoords(edge.from, edge.to)
      if (uiEdge !== undefined) uiEdge.redraw.bind(uiEdge)(true)
    }
    this.updated()
  }

  getPureEdge(edge) {
    return new SEdge(edge.from, edge.to)
  }

  fileNodesToEdge(nodes) {
    return this.getPureEdge({
      from: {
        x: nodes.from[0],
        y: nodes.from[1],
      },
      to: {
        x: nodes.to[0],
        y: nodes.to[1],
      },
    })
  }

  edgeToFileNodes(edge) {
    return {
      from: [edge.from.x, edge.from.y],
      to: [edge.to.x, edge.to.y],
    }
  }

  removeEdge(edge) {
    if (edge === undefined) edge = this.uiEdge
    if (edge === undefined) return
    const model = this.model
    const selectedEdge = this.getPureEdge(edge)
    if (this.model.isExistsAtEdge(undefined, selectedEdge)) {
      const xElem = edge.element
      this.model.removeElement(undefined, selectedEdge)
      this.undoManager.add({
        undo: () => model.add(xElem.getProps(), selectedEdge),
        redo: () => model.removeElement(undefined, selectedEdge),
      })
    }
  }

  placeWire(edge) {
    if (edge === undefined) edge = this.uiEdge
    if (edge === undefined) return
    if (!this.model.isExistsAtEdge(undefined, this.getPureEdge(edge))) {
      this.createNewElement({ type: Wire }, this.getPureEdge(edge))
    }
  }

  createNewElement(props, selectedEdge) {
    this.model.add(props, selectedEdge)
    const model = this.model
    this.undoManager.add({
      undo: () => model.removeElement(undefined, selectedEdge),
      redo: () => model.add(props, selectedEdge),
    })
  }

  addNewElemPhase1(edge) {
    this.selectedEdge = this.getPureEdge(edge)
    this.uiField.stopKeysListen()
    this.uiField.showNewElmeModal()
  }

  showElemProp(edge) {
    this.selectedEdge = this.getPureEdge(edge)
    this.uiField.stopKeysListen()
    this.uiField.showElemProp(edge)
  }

  newElementDialogSave() {
    this.uiField.hideNewElemModal()
    this.uiField.listenToKeys()
    let props = this.uiField.getNewElemDialogResult()
    this.createNewElement(props, this.selectedEdge)
  }

  saveElement(newProps, edge) {
    const currEdge = this.model.findEdge(edge)
    const currProps = currEdge.element.getProps()
    currEdge.element.saveProps(newProps)
    const _newProps = newProps
    this.undoManager.add({
      undo: () => {
        const currEdge = this.model.findEdge(edge)
        currEdge.element.saveProps(currProps)
      },
      redo: () => {
        const currEdge = this.model.findEdge(edge)
        currEdge.element.saveProps(_newProps)
      },
    })
  }

  elementDialogSave() {
    this.uiField.hideShowElemModal()
    this.uiField.listenToKeys()
    let elemProps = this.uiField.getShowElemDialogResult()
    this.saveElement(elemProps, this.selectedEdge)
  }

  setCurrentEdge(uiEdge) {
    this.uiEdge = uiEdge
  }

  getCurrentEdge() {
    return this.uiEdge
  }

  invertPole() {
    let edge = this.uiEdge
    if (edge === undefined) return
    const model = this.model
    const selectedEdge = this.getPureEdge(edge)
    this.model.invertPole(selectedEdge)
    this.undoManager.add({
      undo: () => model.invertPole(selectedEdge),
      redo: () => model.invertPole(selectedEdge),
    })
  }

  loadFromFile(edges) {
    console.log(edges)
  }

  subscribe(handler) {
    this.subscribers.push(handler)
  }

  unsubscribe(handler) {
    this.subscribers.delete(handler)
  }

  updated(args) {
    this.subscribers.forEach(h => h.bind(h)(args))
  }

  reset() {
    this.undoManager.clear()
    this.model.reset()
  }
}
