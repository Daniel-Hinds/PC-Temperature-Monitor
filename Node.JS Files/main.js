const { worker } = require("cluster");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow(){
    win = new BrowserWindow({width: 1200, height: 800, maxWidth: 1200, maxHeight: 800, backgroundColor: ''});


    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),   //creates window using index.html
        protocol: 'file',
        slashes: true
    }));


    win.on('closed', () => {       //allows user to close window
        win = null;;
    })
};
app.on('ready', createWindow);
//////////WORKER HIDDEN BROWSER//////
//Rest of application
