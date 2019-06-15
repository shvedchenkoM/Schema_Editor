class Resistor extends BaseCEElement {
  constructor(props, nodes) {
    super()
    this.getSvgName = () => "resistor"
    this.name = props.name
    this.value = props.value
    this.saveProps(props)
    this.type = "r"
    this.t = 1
    this.nodes = nodes
  }

  getColor() {
    return "orange"
  }
}
