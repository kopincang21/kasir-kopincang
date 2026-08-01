const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Kasir Kopincang',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
  })

  const isDev = !app.isPackaged

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    // Coba beberapa lokasi file index.html
    const possiblePaths = [
      path.join(__dirname, 'dist', 'index.html'),
      path.join(process.resourcesPath, 'dist', 'index.html'),
      path.join(app.getAppPath(), 'dist', 'index.html'),
    ]

    let indexPath = null
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        indexPath = p
        break
      }
    }

    if (indexPath) {
      win.loadFile(indexPath)
    } else {
      // fallback: load dari resources/app/dist
      win.loadFile(path.join(process.resourcesPath, 'app', 'dist', 'index.html'))
    }
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
