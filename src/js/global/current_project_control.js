// TODO: move maybe to global reference script
var viewOffsetX = 0.0
var viewOffsetY = 0.0
var viewZoomLevel = 1.0

var elements = Array.prototype.slice.call(document.getElementsByClassName('element'))
console.log(elements)
elements.forEach(element => {
    element.addEventListener('click', (ev) => {
        console.log(element.children[0].classList.toggle('selected'))
        console.log(ev)
    })
});

function scaleOutline() {
    document.querySelector(':root').style.setProperty('--var-outline-width', String(5 / viewZoomLevel) + "px")
}


var project_path = ''
var project_manifest = {
    label: "Test",
    author: "GibbDev"
}
var boards = {
    'board 1' : {
        elements: {
            photo_elements  : [],
            picture_elements: [],
            label_elements  : [],
            canvas_elements : [],
            text_elements   : [],
        }
    }
}

const bg = document.getElementById('board-background')

document.addEventListener('wheel', (ev) => {
    mouseOffsetX = ev.clientX
    mouseOffsetY = ev.clientY
    if (ev.deltaY > 0 ) {
        zoom_out()
    } else {
        zoom_in()
    }
    viewZoomLevel = parseFloat(bg.style.backgroundSize) / 100
    updateBoardLabels()
})

document.addEventListener('mousedown', (ev) => {
    if (ev.button === 1) {
        ev.preventDefault();
    }
})

var mouseOffsetX
var mouseOffsetY

document.addEventListener('mousemove', (ev) => {
    mouseOffsetX = ev.clientX
    mouseOffsetY = ev.clientY
    if (bg.style.backgroundPositionX === '') {bg.style.backgroundPositionX = '0'}
    if (bg.style.backgroundPositionY === '') {bg.style.backgroundPositionY = '0'}
    updateBoardLabels()
    if (ev.buttons === 4) {
        var moveX = ev.movementX
        var moveY = ev.movementY
        var bgX = parseInt(bg.style.backgroundPositionX)
        var bgY = parseInt(bg.style.backgroundPositionY)
        viewOffsetX = parseInt(bgX + moveX)
        viewOffsetY = parseInt(bgY + moveY)
        bg.style.backgroundPositionX = String(viewOffsetX) + "px"
        bg.style.backgroundPositionY = String(viewOffsetY) + "px"
        updateBoardLabels()
    }
})

function updateBoardLabels() {
    document.getElementById('board-zoom-indicator').innerText = String(viewZoomLevel.toFixed(2)) + "x"
    document.getElementById('board-cords-indicator').innerText = String(parseInt((mouseOffsetX - parseInt(bg.style.backgroundPositionX)) / viewZoomLevel)) + "x : " + String(parseInt((mouseOffsetY -parseInt(bg.style.backgroundPositionY)) / -viewZoomLevel)) + "y"
    retart_animation(document.getElementById('board-zoom-indicator'))
    retart_animation(document.getElementById('board-cords-indicator'))
    scaleOutline()
    var el = document.getElementById('board-elements')
    el.style.transform = "scale(" + viewZoomLevel + ")"
    el.style.left = String(viewOffsetX) + "px"
    el.style.top = String(viewOffsetY) + "px"
}

function zoom_in() {
    if (bg.style.backgroundSize === '') {
        bg.style.backgroundSize = '100px'
    }
    var new_zoom = parseFloat(bg.style.backgroundSize) + 5
    if (new_zoom > 500) {new_zoom = 500}
    updateZoom(new_zoom)
}
function zoom_out() {
    if (bg.style.backgroundSize === '') {
        bg.style.backgroundSize = '100px'
    }
    var new_zoom = parseFloat(bg.style.backgroundSize) -5
    if (new_zoom < 5.0) {new_zoom = 5.0}
    updateZoom(new_zoom)
}

function updateZoom(new_zoom) {
    var zoom_diff = 1 + (new_zoom / 100 - viewZoomLevel)
    var zoom_offset_x = (parseFloat(bg.style.backgroundPositionX) - mouseOffsetX) / viewZoomLevel
    var zoom_offset_y = (parseFloat(bg.style.backgroundPositionY) - mouseOffsetY) / viewZoomLevel
    viewOffsetX = parseFloat(bg.style.backgroundPositionX) + (zoom_offset_x * zoom_diff - zoom_offset_x)
    viewOffsetY = parseFloat(bg.style.backgroundPositionY) + (zoom_offset_y * zoom_diff - zoom_offset_y)
    bg.style.backgroundPositionX = String(viewOffsetX) + "px"
    bg.style.backgroundPositionY = String(viewOffsetY) + "px"
    bg.style.backgroundSize = (String(new_zoom) + 'px')
}




const {ipcRenderer} = require('electron')
const ipc = ipcRenderer

function setProjectPath() {
    ipc.send('get-project-path')
}

function writeManifest() {
    ipc.send('write-json-to-path', String(project_path) + '/mainfest.json', project_manifest)
}

ipcRenderer.on('set-project-path', (_event, path) => {
    console.log(path)
    project_path = path
})
