const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

const closeButton = document.getElementById('button-close')
const maximizeButton = document.getElementById('button-maximize')
const minimizeButton = document.getElementById('button-minimize')

closeButton.addEventListener('click', () => {
    ipc.send('closeApp')
})
maximizeButton.addEventListener('click', () => {
    ipc.send('maximizeApp')
})
minimizeButton.addEventListener('click', () => {
    ipc.send('minimizeApp')
})

ipcRenderer.on('changeMaximizeIcon', (_event, state) => {
    console.log(state)
    if (state) {
        maximizeButton.childNodes[0].src = '../../assets/svg/restore.svg'
        maximizeButton.title = 'Restore window'
    } else {
        maximizeButton.childNodes[0].src = '../../assets/svg/maximize.svg'
        maximizeButton.title = 'Maximize window'
    }
})

function request() {
    console.log('signal sent')
    ipc.send('image-get')
}

ipcRenderer.on('image-set', (_event, image) => {
    console.log('file://' + image)
    document.getElementById('imgae').src = 'file://' + image
})