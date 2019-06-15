class Wire extends BaseCEElement {
  constructor(props, nodes) {
    super()
    this.needSVGAdjust = () => false
    this.type = "w"
    this.t = 0
    this.nodes = nodes
  }

  getColor() {
    return "orange"
  }

  getPath(eedge) {
    let wire = new Path.Line({
      from: [eedge.vis_from.x, eedge.vis_from.y],
      to: [eedge.vis_to.x, eedge.vis_to.y],
      strokeColor: "#88EEEE",
      strokeWidth: 2,
      fillColor: "#88EEEE",
    })
    return wire
  }
}
