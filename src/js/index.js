const app_window = window.__TAURI__.window.getCurrentWindow()


function _ready() {
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault()
    })
}

document.addEventListener("DOMContentLoaded", () => {
    _ready()
})