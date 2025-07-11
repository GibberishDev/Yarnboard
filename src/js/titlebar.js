// const app_window = window.__TAURI__.window.getCurrentWindow() // Initiated in ./index.js

function changeTitle(name = "Yarnboard") {
    document.querySelector("#title-bar-label").textContent = name
}

document.querySelector("#button-minimize").addEventListener("click", () => {
    app_window.minimize()
})

document.querySelector("#button-maximize").addEventListener("click", () => {
    app_window.toggleMaximize()
})

document.querySelector("#button-close").addEventListener("click", () => {
    app_window.close()
})

document.querySelector("#title-bar-icon-button").addEventListener("click", () => {
    alert("Icon button")
})

document.querySelector("#title-bar-menu-button").addEventListener("click", () => {
    alert("Menu button")
})
document.querySelector("#title-bar-settings-button").addEventListener("click", () => {
    var style = document.getElementById("settings-menu").style
    style.display === "flex" ? style.display = "none" : style.display = "flex"
})