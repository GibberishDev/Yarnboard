
const newProjectButton = document.getElementById("new-project-button")
const openProjectButton = document.getElementById("open-project-button")
const aboutButton = document.getElementById("about-button")
const settingsButton = document.getElementById("settings-button")

newProjectButton.addEventListener("click", (ev) => {
    console.log(createProject())
})
openProjectButton.addEventListener("click", (ev) => {
    console.log(openProject())
})
aboutProjectButton.addEventListener("click", (ev) => {
    console.log(showAbout())
})
aboutProjectButton.addEventListener("click", (ev) => {
    console.log(showSettings())
})


