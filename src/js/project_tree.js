const container = document.querySelector("#project-tree-container")
const resizer = document.querySelector("#project-tree-resizer")

document.addEventListener("mousemove", (ev) => {
    if (container.classList.contains("tree-hidden")) {
        if (ev.x <= 200) {
            container.classList.remove("hidden")
        } else {
            container.classList.add("hidden")
            resizer_dragged = false
        }
    }
})


container.addEventListener("click", (ev) => {
    if  (container.classList.contains("tree-hidden")) {
        container.classList.remove("tree-hidden")
        if (parseInt(container.style.width) < 200) {
            container.style.width = "200px"
        }
    }
})

function handleDrag(ev) {
    if (resizer_dragged) {
        container.style.width = String(ev.x - 6) + "px"
    }
}

var resizer_dragged = false

document.addEventListener("mousemove", (ev) => {handleDrag(ev)})

resizer.addEventListener("mousedown", (ev) => {
    resizer_dragged = true
})

document.addEventListener("mouseup", (ev) => {
    if (resizer_dragged) {
        resizer_dragged = false
        if (parseInt(container.style.width) < 200) {
            container.classList.add("tree-hidden")
            container.style.width = "16px"
            resizer_dragged = false
        }
    }
})