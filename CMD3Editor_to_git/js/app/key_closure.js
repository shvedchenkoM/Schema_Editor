class Key_closure extends BaseCEElement {
  constructor(props, nodes) {
    super()
    this.saveProps(props)
    this.type = "kc"
    this.nodes = nodes
  }

  getColor() {
    return "rose"
  }
}
