class BaseCEElement {
  constructor() {
    this.getColor = () => "orange"
    this.getSvgName = () => "base"
    this.needSVGAdjust = () => true
    this.invPol = false
    this.supportPolarity = false
  }

  static getUI(newD, showD) {
    return new GenericElementUI(newD, showD)
  }

  static fileToProps(fileData) {
    return {
      name: fileData.name,
      value: fileData.value,
      invPol: fileData.invPol,
      currValue: fileData.cur_value,
      type: this,
    }
  }

  getPath() {
    const cont = {}
    const loadedSvg = window.svgStore[this.getSvgName()]
    paper.project.importSVG(loadedSvg, item => {
      cont.path = item
      cont.path.setVisible(false)
    })
    return cont.path
  }

  inversePolarity() {
    if (this.supportPolarity) {
      this.invPol = !this.invPol
    }
  }

  getProps() {
    return {
      name: this.name,
      value: this.value,
      type: this.constructor,
      invPol: this.invPol,
    }
  }

  saveProps(prop) {
    this.name = prop.name
    this.value = prop.value
    this.invPol = prop.invPol
    this.currValue = prop.currValue
  }
}
