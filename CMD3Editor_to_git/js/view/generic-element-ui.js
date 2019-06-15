class GenericElementUI {
  constructor(newElemDialog, elemDialog) {
    this.newElemDialog = newElemDialog
    this.elemDialog = elemDialog
  }

  showElement(elem) {
    let name = document.getElementById("sepInputName")
    let currValue = document.getElementById("sepCurrValue")
    let value = document.getElementById("sepInputValue")
    const otherValue = document.getElementById("showEdsUI")
    otherValue.hidden = true
    name.value = elem.name
    currValue.value = elem.currValue
    value.value = elem.value
    this.elemDialog.show()
  }

  getEditResult() {
    let name = document.getElementById("sepInputName").value
    let value = +document.getElementById("sepInputValue").value
    return {
      name,
      value,
    }
  }

  getNewResult(type) {
    let name = document.getElementById("inputName").value
    let value = +document.getElementById("inputValue").value
    return {
      name,
      value,
      type,
    }
  }
}
