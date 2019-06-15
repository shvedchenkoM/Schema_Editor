class Ohmmeter extends BaseCEElement {
  constructor(props, nodes) {
    super()
    this.saveProps(props)
    this.type = "om"
    this.nodes = nodes
    this.supportPolarity = true
  }

  getColor() {
    return "lightgreen"
  }
}
