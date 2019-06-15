class Eds extends BaseCEElement {
  constructor(props, nodes) {
    super()
    this.getSvgName = () => "eds"
    this.saveProps(props)
    this.type = "e"
    this.t = 2
    this.nodes = nodes
    this.supportPolarity = true
  }

  static getUI(newD, showD) {
    return new EdsElementUI(newD, showD)
  }

  static fileToProps(fileData) {
    return {
      name: fileData.name,
      value: fileData.value,
      second_value: fileData.second_value,
      currValue: fileData.currValue,
      type: this,
      invPol: fileData.invPol,
    }
  }

  getColor() {
    return "red"
  }
  getProps() {
    return {
      name: this.name,
      value: this.value,
      second_value: this.second_value,
      type: this.constructor,
      invPol: this.invPol,
    }
  }

  saveProps(prop) {
    this.name = prop.name
    this.value = prop.value
    this.second_value = prop.second_value
    this.invPol = prop.invPol
    this.currValue = prop.currValue
  }
}
