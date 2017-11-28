if(!process.env.DEV){ require('./server') }

const {autoUpdater} = require('electron-updater');
autoUpdater.autoDownload = false;

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
var ipcMain = require('electron').ipcMain;
let mainWindow;
let splashWindow;

const inspector = process.env.DEV ? true : false;
const startUrl = 'http://localhost:3007';
const startUrlSplash = path.join(startUrl, 'splash.html');

ipcMain.on('authClearCookies', () => {
    mainWindow.webContents.session.clearStorageData({
        storages: ['local storage', 'cookies']
    })
});

ipcMain.on('openAuthWindow', createAuthWindow);

function handleCallback (url, config) {
    
    var raw_code = /code=([^&]*)/.exec(url) || null;
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    var err = /\?error=(.+)$/.exec(url);
    
    if (code || err) { authWindow.destroy() }
  
    if (code) {

      mainWindow.webContents.send('receivedCode', {code, config});

    } else if (err) {
        mainWindow.webContents.send('receivedErr');
    }

  }


function createAuthWindow(){
    
    const config = {
        client_id: "1033d581116c6ebc4f60",
        client_secret: "74360dea7a68388bad6cf9f574535ae9e00f3ab3",
        scope: ['repo', 'user']
    }

    const {client_id, client_seceret, scope} = config;

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`;

    authWindow = new BrowserWindow({ 
        width: 400, 
        height: 600,
        parent: mainWindow,
        alwaysOnTop: true
    });

    authWindow.setMenu(null);
    authWindow.loadURL(authUrl);

    authWindow.on('closed', function() {
        authWindow = null
    })

    authWindow.webContents.on('will-navigate', function (event, url) {
        handleCallback(url, config);
    });

}

function createMainWindow() {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        backgroundColor: '#313131',
        webPreferences: {
            webSecurity: false,
            devTools: inspector
        }
    });

    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', function () {
        mainWindow = null
    })

}


function createSplashWindow() {
    
        splashWindow = new BrowserWindow({
            width: 300,
            height: 370,
            resizable: false,
            backgroundColor: '#313131',
            movable: false,
            frame: false,
            webPreferences: {
                webSecurity: false,
                devTools: inspector
            }
        });
    
        splashWindow.loadURL(startUrlSplash);
    
        splashWindow.on('closed', function () {
            splashWindow = null
        })
    
    }


    

autoUpdater.on('update-available', info => {
    mainWindow.webContents.send('updateAvailable', info)
});

ipcMain.on('downloadUpdate', (event, arg) => {
    autoUpdater.downloadUpdate();
})

autoUpdater.on('update-downloaded', info => {
    mainWindow.webContents.send('updateDownloaded')
});

ipcMain.on('quitAndInstall', (event, arg) => {
    autoUpdater.quitAndInstall();
})



app.on('ready', function(){
    
    createMainWindow();
    createSplashWindow(); 
    
    setTimeout(()=>{

        mainWindow.show();
        splashWindow.close();
        autoUpdater.checkForUpdates();

    },2000);
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow()
        mainWindow.show();
    }
});