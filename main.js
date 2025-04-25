const { app, BrowserWindow, ipcMain} = require('electron');
const ipc = ipcMain;
const PATH = require('path');

const createWindow = () => {
    const WINDOW = new BrowserWindow({
        width: 960,
        height: 540,
        minWidth: 768,
        minHeight: 432,
        hasShadow: false,
        frame: false,
        maximizable: true,
        icon: PATH.join(__dirname, 'assets/ico/icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: PATH.join(__dirname, 'src/js/preload.js')
        }
    });

    WINDOW.loadFile('src/html/index.html');

    ipc.on('closeApp', () => {
        WINDOW.close()
    });
    
    ipc.on('minimizeApp', () => {
        WINDOW.minimize()
    });
    
    ipc.on('maximizeApp', () => {
        if (WINDOW.isMaximized()) {
            WINDOW.restore()
        } else {
            WINDOW.maximize()
        }
    });

    WINDOW.on('maximize', () => {
        WINDOW.webContents.send('changeMaximizeIcon', true)
    })

    WINDOW.on('unmaximize', () => {
        WINDOW.webContents.send('changeMaximizeIcon', false)
    }) 

}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', ()=>{
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
})

app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

