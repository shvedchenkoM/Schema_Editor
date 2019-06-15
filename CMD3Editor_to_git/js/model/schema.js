class Schema {
  constructor(appConfig) {
    this.appConfig = appConfig
    this.elements = []
    this.handlers = []
  }

  add(props, selectedEdge) {
    let element = this.getCEObjectCreated(props, selectedEdge)
    let newItem = {
      element: element,
      edge: selectedEdge,
    }
    this.elements.push(newItem)
    this.updated({ addedElement: newItem })
  }

  removeElement(type, edge) {
    let ix = this.findEdgeIx(edge)
    if (ix !== undefined) {
      this.elements.splice(ix, 1)
      this.updated({ removedEdge: edge })
    }
  }

  getState() {
    return this.elements
  }

  getCEObjectCreated(props, edge) {
    return new props.type(props, {
      from: edge.from,
      to: edge.to,
    })
  }

  // finds edge specified by type
  findByTypeEdge(type, edge) {
    const ix = this.this.findEdgeIx(edge, type)
    return this.findEdgeByIx(ix)
  }

  findEdge(edge) {
    const ix = this.findEdgeIx(edge)
    return this.findEdgeByIx(ix)
  }

  findEdgeIx(edge, type) {
    return this.elements.findIndex(
      x => edge.equals(x.edge) && (type === undefined || x.element.type === type),
    )
  }

  findEdgeByIx(ix) {
    if (ix !== undefined) return this.elements[ix]
  }

  isExistsAtEdge(type, edge) {
    let diff = type !== undefined ? this.findByTypeEdge(type, edge) : this.findEdge(edge)
    return diff != undefined
  }

  invertPole(edge) {
    let elem = this.findEdge(edge)
    if (elem !== undefined) {
      if (elem.element.supportPolarity) {
        elem.element.inversePolarity.bind(elem.element)()
        this.updated({ updated: { edge: elem.edge } })
      }
    }
  }

  subscribe(handler) {
    this.handlers.push(handler)
  }

  unsubscribe(handler) {
    this.handlers.delete(handler)
  }

  updated(args) {
    this.handlers.forEach(h => h.bind(h)(args))
  }

  calculate() {
    this.elements.filter(item => item.element.type === "am").forEach(item => {
      item.element.value = this.ref.find(i => i.name === item.element.name).value
    })
  }

  reference() {
    this.ref = [{ name: "A1", value: 10 }, { name: "A2", value: 30 }]
  }

  reset() {
    this.elements.map(e => e.edge).forEach(e => this.removeElement(undefined, e))
  }
}
