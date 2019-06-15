requirejs.config({
  baseUrl: "./js",
  paths: {
    undomanager: "vendor/undo-manager",
  },
  shim: {
    undomanager: {
      exports: "UndoManager",
    },
  },
  deps: ["main"],
})
