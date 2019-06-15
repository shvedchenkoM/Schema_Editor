class EdsElementUI {
  constructor(newElemDialog, elemDialog) {
    this.newElemDialog = newElemDialog
    this.elemDialog = elemDialog
  }

  showElement(elem) {
    let name = document.getElementById("sepInputName")
    let currValue = document.getElementById("sepCurrValue")
    let value = document.getElementById("sepInputValue")
    const otherValue = document.getElementById("showEdsUI")
    otherValue.hidden = false
    let second_value = document.getElementById("sepInputsecond_value")
    name.value = elem.name
    value.value = elem.value
    currValue.value = elem.currValue
    second_value.value = elem.second_value
    this.elemDialog.show()
  }

  getEditResult() {
    let name = document.getElementById("sepInputName").value

    let value = +document.getElementById("sepInputValue").value
    let second_value = +document.getElementById("sepInputsecond_value").value
    return {
      name,
      value,
      second_value,
    }
  }

  getNewResult(type) {
    let name = document.getElementById("inputName").value
    let value = +document.getElementById("inputValue").value
    let second_value = +document.getElementById("inputsecond_value").value
    return {
      name,
      value,
      type,
      second_value,
    }
  }
}
