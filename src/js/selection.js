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

async function handleSelection(event) {
    if (event.button !== 0) {return}
    event.stopPropagation()
    element = event.currentTarget
    multiple = event.shiftKey
    isSelected = (selectedElements.indexOf(element) !== -1 || element.classList.contains("selected"))
    otherSelected = (document.querySelectorAll(".selected").length > 0 || selectedElements.length > 0)
    if (otherSelected) {
        if (multiple) {
            if (isSelected) {
                deselectElement(element);
                return
            }
            else {
                selectElement(element)
            }
        } else {
            await deselectAll()
            selectElement(element)
        }
    } else {
        selectElement(element)
    }
}

function addSelectionListener(el) {
    el.addEventListener('click',handleSelection, true)
}

function removeSelectionListener(el) {
    el.removeEventListener('click', handleSelection, true)
}

document.querySelector("#project-background").addEventListener("click", (ev) =>{
    if (ev.button === 0) { deselectAll() }
}, true)

var mousePressed = false
var dragSelecting = false
var dragSelectStart = {x:0, y:0}
var dragSelectEnd = {x:0, y:0}
const selectionRect = document.querySelector("#selection-rect")

document.querySelector("#project-background").addEventListener("mousedown", (ev) => {
    if (ev.button === 0) {
        mousePressed = true
        dragSelectStart.x = (ev.pageX - (window.innerWidth - viewControl.viewportData.width / 2.0)) - viewControl.currentViewData.pos.x
        dragSelectStart.y = (ev.pageY - (window.innerHeight - viewControl.viewportData.height / 2.0)) - viewControl.currentViewData.pos.y
    }
})

document.addEventListener("mouseup", (ev) => {
    if (ev.button === 0) {
        mousePressed = false
        dragSelecting = false
        selectionRect.style.display = "none"
        document.querySelector(":root").style.setProperty("--var-selection-rect-inactive", "all")
    }
})

document.addEventListener("mousemove", (ev) => {
    if (mousePressed && ev.button === 0) {
        dragSelecting = true
        dragSelectEnd.x = (ev.pageX - (window.innerWidth - viewControl.viewportData.width / 2.0)) - viewControl.currentViewData.pos.x
        dragSelectEnd.y = (ev.pageY - (window.innerHeight - viewControl.viewportData.height / 2.0)) - viewControl.currentViewData.pos.y
        handleSelectionRect()
    }
})

function handleSelectionRect() {
    if (dragSelecting) { 
        document.querySelector(":root").style.setProperty("--var-selection-rect-inactive", "none")
        selectionRect.style.display = "block"
        var width = (dragSelectEnd.x - dragSelectStart.x) / viewControl.currentViewData.scale
        var height = (dragSelectEnd.y - dragSelectStart.y) / viewControl.currentViewData.scale
        var left = dragSelectStart.x / viewControl.currentViewData.scale
        var top = dragSelectStart.y / viewControl.currentViewData.scale
        if (width < 0) { left += width }
        if (height < 0) { top += height}
        selectionRect.style.left = String(left) + "px"
        selectionRect.style.top = String(top) + "px"
        selectionRect.style.width = String(Math.abs(width)) + "px"
        selectionRect.style.height = String(Math.abs(height)) + "px"
    }
}

// TODO: move this method into project management script on loading all elements. Add and remove listeners dynamically afterwards
document.querySelectorAll(".element").forEach((el) => {
    addSelectionListener(el)
})


// TODO: setCursorPosition is broken rn. Git link: https://github.com/tauri-apps/tao/pull/1104