const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');

const { isMac } = require("./utils");
const initMainMenu = require("./initMainMenu");

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    app.mainWindow = mainWindow;

    void mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.webContents.openDevTools();

    initMainMenu();
};

ipcMain.on("item:add", (e, item) => {
    app.mainWindow.webContents.send("item:add", item);
    app.addWindow.close();
});

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});