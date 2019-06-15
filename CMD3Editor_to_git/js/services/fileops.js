class FileOps {
  constructor(fileInputId, controller, saveFileId) {
    this.fileInputId = fileInputId
    this.controller = controller
    this.saveFileId = saveFileId

    this.exportLink = document.getElementById("saveLink")

    this.initEvents()

    this.controller.subscribe(this.onControllerUpdated.bind(this))
  }

  initEvents() {
    document
      .getElementById(this.fileInputId)
      .addEventListener("change", this.handleFileSelect.bind(this), false)

    this.saveFileElem = document.getElementById(this.saveFileId)
    this.saveFileElem.addEventListener("click", this.handleFileExport.bind(this), false)
  }

  //inport
  handleFileSelect(evt) {
    let file = evt.target.files[0] // FileList object
    let reader = new FileReader()
    reader.onload = event => {
      let mod = JSON.parse(event.target.result)
      this.controller.reset()
      this.importSchema(mod.data)
      // controller.reset - clean all data from model
    }
    reader.readAsText(file)
  }

  importSchema(schema) {
    schema
      .map(item => ({
        item: item,
        rdr: CETypes.find(i => i.shortType === item.type).clazz,
      }))
      .map(r => ({
        props: r.rdr.fileToProps(r.item),
        edge: controller.fileNodesToEdge(r.item.nodes),
      }))
      .forEach(item => controller.createNewElement(item.props, item.edge))
  }

  handleFileExport(evt) {
    if (this.controller.model.elements.length > 0) {
      let iis = this.prepareDataForExport(this.controller.model.elements)

      let fileCont = JSON.stringify({ data: iis }, null, 2)
      this.showExportLink()
      this.exportLink.setAttribute(
        "href",
        "data:application/octet-stream," + encodeURIComponent(fileCont),
      )
    }
  }

  calculateSchema() {
    if (this.controller.model.elements.length > 0) {
      let iis = this.prepareDataForExport(this.controller.model.elements)
      let newSchema = calculateCurrents({ data: iis })
      this.controller.reset()
      this.importSchema(newSchema)
    }
  }

  prepareDataForExport(mod) {
    return mod.map(i => {
      let pr = i.element.getProps()
      pr.type = i.element.type
      pr.t = i.element.t
      pr.nodes = controller.edgeToFileNodes(i.edge)
      return pr
    })
  }

  showExportLink() {
    this.saveFileElem.style.display = "none"
    this.exportLink.style.display = ""
  }
  hideExportLink() {
    this.saveFileElem.style.display = ""
    this.exportLink.style.display = "none"
  }

  onControllerUpdated() {
    this.hideExportLink()
  }
}
