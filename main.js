const { app, BrowserWindow, ipcMain, dialog, Menu} = require('electron');
const path = require('path');

const FILE_MANAGER = require(path.join(__dirname, 'src/js/global/file_management.js'))
const Clipboard = require(path.join(__dirname, 'src/js/global/clipboard.js'))

const browserWindowSettings = {
    width: 960,
    height: 540,
    minWidth: 768,
    minHeight: 432,
    hasShadow: false,
    frame: false,
    maximizable: true,
    autoHideMenuBar: true,
    title: 'Yarnboard',
    icon: path.join(__dirname, 'assets/ico/icon.ico'),
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        preload: path.join(__dirname, 'src/js/preload.js'),
    }
}

const createWindow = () => {
    const WINDOW = new BrowserWindow(browserWindowSettings);

    WINDOW.loadFile('src/html/index.html');

    registerWindowIpcSignals(WINDOW)
    registerWindowIpcCalls(WINDOW)

    WINDOW.webContents.on('did-finish-load', () => {
        WINDOW.webContents.setZoomFactor(1.0)
    })
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
})
app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

// #region Window ipc signals

    function registerWindowIpcSignals(win) {
        ipcMain.on('closeApp', () => {
            win.close()
        });
        
        ipcMain.on('minimizeApp', () => {
            win.minimize()
        });
        
        ipcMain.on('maximizeApp', () => {
            if (win.isMaximized()) {
                win.restore()
            } else {
                win.maximize()
            }
        });
    
        ipcMain.on('get-project-path', async () => {
            win.webContents.send('set-project-path', (await dialog.showOpenDialog({properties:['openDirectory']})).filePaths[0])
        })
    
        ipcMain.on('write-json-to-path', async (_event, path, object) => {
            console.log("recieved: path: ", path, " - object: ", object)
            FILE_MANAGER.write_json_file(path, object)
        })

        ipcMain.handle('get-clipboard-contents', (_event, path) => {
            FILE_MANAGER.writeImageFromBase64(path, Clipboard.getImageFromClipboard())
            return path
        })
    }

    function registerWindowIpcCalls(win) {
        win.on('maximize', () => {
            win.webContents.send('changeMaximizeIcon', true)
        })
        win.on('unmaximize', () => {
            win.webContents.send('changeMaximizeIcon', false)
        })
    }
// #endregion

// #region Disable zoom functionality
const { is } = require('@electron-toolkit/utils')
const template = [{
    label: `Options`,
    submenu: [
      { label: 'Refresh', role: 'reload' },
      { label: 'Force Reload', role: 'forceReload' }
    ]
}]

if (is.dev) {
    template.push(
      { type: 'separator' },
      { label: 'Dev Tools', role: 'toggleDevTools' }
    )
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
// #endregion


