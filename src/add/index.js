const path = require('path');

const { BrowserWindow, app } = require('electron');

const createAddWindow = () => {
    const addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add item",
        parent: app.mainWindow,
        webPreferences: {
            nodeIntegration: true
        }
    });

    void addWindow.loadFile(path.join(__dirname, 'index.html'));

    addWindow.on("close", () => app.addWindow = null);

    app.addWindow = addWindow;

};

module.exports = {
    createAddWindow
};