const container = document.querySelector("#project-tree-container")

document.addEventListener("mousemove", (ev) => {
    if (container.classList.contains("tree-hidden")) {
        if (ev.x <= 64) {
            container.classList.remove("hidden")
        } else {
            container.classList.add("hidden")
        }
    }
})


container.addEventListener("click", (ev) => {
    if  (container.classList.contains("tree-hidden")) {
        container.classList.remove("tree-hidden")
    }
})