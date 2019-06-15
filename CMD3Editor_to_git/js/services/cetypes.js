function initGlobalConfig() {
  let CETypes = [
    { type: "wire", clazz: Wire, shortType: "w" },
    { type: "resistor", clazz: Resistor, shortType: "r" },
    { type: "ammeter", clazz: Ammeter, shortType: "am" },
    { type: "voltmeter", clazz: Voltmeter, shortType: "v" },
    { type: "eds", clazz: Eds, shortType: "e" },
    { type: "ohmmeter", clazz: Ohmmeter, shortType: "om" },
  ]

  let appConfig = {
    nodes_col: 25,
    nodes_row: 12,
    view: {
      strideSize: 40,
    },
  }

  return {
    CETypes,
    appConfig,
  }
}
