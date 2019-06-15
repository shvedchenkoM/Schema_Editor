require([
  "vendor/underscore-min",
  "vendor/paper-full.min",
  "undomanager",
  "vendor/math.min",
  "app/baseceelement",
], function(underscore, paperjs, UndoManager, mathjs, BaseCeElemnet) {
  window.UndoManager = UndoManager
  window.mathjs = mathjs
  require(["vendor/bootstrap-native.min"], function(bsn) {
    this.bsn = bsn
    require([
      "app/ammeter",
      "app/eds",
      "app/key_closure",
      "app/ohmmeter",
      "app/resistor",
      "app/voltmeter",
      "app/wire",
      "services/cetypes",
      "model/sedge",
      "model/schema",
      "services/schemacontroller",
      "services/fileops",
      "view/eedge",
      "view/uifield",
      "view/generic-element-ui",
      "view/eds-element-ui",
      "svg/loader",
      "rechnen",
    ], function() {
      init()
    })
  })
})

async function init() {
  const { CETypes, appConfig } = initGlobalConfig()

  window.CETypes = CETypes
  window.appConfig = appConfig

  paper.install(window)
  const canvas = document.getElementById("canvas")
  canvas.width = appConfig.nodes_col * appConfig.view.strideSize
  canvas.height = appConfig.nodes_row * appConfig.view.strideSize
  paper.setup(canvas)

  window.schemaModel = new Schema()
  window.uiField = new UIField(appConfig, bsn, CETypes)
  window.controller = new SchemaController(schemaModel, uiField)
  uiField.injectController(controller)
  window.fileOps = new FileOps("inputFile", controller, "exportSchemaButton")

  await loadSvg(paper.project)
  uiField.initView(appConfig)
}
