

function _ready() {
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault()
    })
}

document.addEventListener("DOMContentLoaded", () => {
    _ready()
})