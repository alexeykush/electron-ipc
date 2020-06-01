const { app, Menu } = require('electron');

const { isMac } = require("./utils");
const { createAddWindow } = require("./add");

module.exports = () => {
    const mainMenuTemplate = [
        {
            label: "File",
            submenu: [
                {
                    label: "Add Item",
                    click: () => createAddWindow()
                },
                {
                    label: "Clear Items",
                    click: () => app.mainWindow.webContents.send("item:clear")
                },
                {
                    label: "Quit",
                    accelerator: isMac ? "Command+Q" : "Ctrl+Q",
                    click: () => app.quit()
                }
            ]
        },
    ];

    if (isMac) {
        mainMenuTemplate.unshift({
            label: app.name,
            submenu: [
                {role: 'about'},
                {type: 'separator'},
                {role: 'services'},
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideothers'},
                {role: 'unhide'},
                {type: 'separator'}
            ]
        });
    }

    if (process.env.NODE_ENV !== "production") {
        mainMenuTemplate.push({
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {
                    label: "Toggle DevTools",
                    accelerator: isMac ? "Command+I" : "Ctrl+I",
                    click: (item, currentWindow) => currentWindow.toggleDevTools()
                },
                {type: 'separator'},
                {role: 'resetzoom'},
                {role: 'zoomin'},
                {role: 'zoomout'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        });
    }

    const menu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(menu);
};