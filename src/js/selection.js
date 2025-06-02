var selectedElements = []

function selectElement(element) {
    if (!element.classList.contains("element")) { return } //Throw out non element calls. Should not trigger at all in theory
    if (selectedElements.indexOf(element) === -1) {
        selectedElements.push(element)
    }
    if (!element.classList.contains("selected")) {
        element.classList.add("selected")
    }
}

function deselectElement(element) {
    if (!element.classList.contains("element")) { return } //Throw out non element calls. Should not trigger at all in theory
    if (selectedElements.indexOf(element) !== -1) {
        var index = selectedElements.indexOf(element)
        selectedElements.splice(index, 1)
    }
    if (element.classList.contains("selected")) {
        element.classList.remove("selected")
    }
}

function deselectAll() {
    document.querySelectorAll(".selected:not(.hidden)").forEach((el) => {
        deselectElement(el)
    })
}

function selectAll() {
    document.querySelectorAll(".element:not(.hidden)").forEach((el) => {
        selectElement(el)
    })
}



// TODO: movbe this method into project management script on loading all elements. Add and remove listeners dynamically afterwards
document.querySelector(".element").addEventListener('click', (ev) => {
    if (ev.button === 0) {handleSelection(ev)}
})
