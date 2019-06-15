class Voltmeter extends BaseCEElement {
  constructor(props, nodes) {
    super()
    this.getSvgName = () => "voltmeter"
    this.name = props.name
    this.value = props.value
    this.polarity = props.polarity
    this.type = "v"
    this.t = 5
    this.nodes = nodes
    this.supportPolarity = true
  }

  getColor() {
    return "purple"
  }
}
