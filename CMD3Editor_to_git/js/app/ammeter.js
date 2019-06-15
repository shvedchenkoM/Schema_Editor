class Ammeter extends BaseCEElement {
  constructor(props, nodes) {
    super()
    this.getSvgName = () => "ammeter"
    this.saveProps(props)
    this.type = "am"
    this.t = 6
    this.nodes = nodes
    this.supportPolarity = true
  }

  getColor() {
    return "red"
  }
}
