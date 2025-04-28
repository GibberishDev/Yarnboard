const { app, BrowserWindow, ipcMain, dialog, Menu} = require('electron');
const ipc = ipcMain;
const PATH = require('path');
const FM = require(PATH.join(__dirname, 'src/js/preloaded_scripts/file_management.js'))
const {is} = require('@electron-toolkit/utils')


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

const createWindow = () => {
    const WINDOW = new BrowserWindow({
        width: 960,
        height: 540,
        minWidth: 768,
        minHeight: 432,
        hasShadow: false,
        frame: false,
        maximizable: true,
        autoHideMenuBar: true,
        title: 'Yarnboard',
        icon: PATH.join(__dirname, 'assets/ico/icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: PATH.join(__dirname, 'src/js/preload.js')
        }
    });

    WINDOW.webContents.on('did-finish-load', () => {
        WINDOW.webContents.setZoomFactor(1.0)
    })

    // WINDOW.loadFile('src/html/project_scene.html');
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

    ipc.on('get-project-path', async () => {
        WINDOW.webContents.send('set-project-path', (await dialog.showOpenDialog({properties:['openDirectory']})).filePaths[0])
    })

    ipc.on('write-json-to-path', async (_event, path, object) => {
        console.log("recieved: path: ", path, " - object: ", object)
        FM.write_json_file(path, object)
    })

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
