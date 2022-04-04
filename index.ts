const { app, globalShortcut, BrowserWindow } = require("electron");
const url = require("url");
const path = require('path')
const { clipboard } = require('electron')
const {getCurrentWindow} = require('electron');

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36';
function newApp() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname,'./images/174879.png')
      })
      win.loadURL('https://web.whatsapp.com/', { userAgent: USER_AGENT });
      globalShortcut.register("CommandOrControl+I", () => {
        if(win.webContents.zoomLevel<=3)
        win.webContents.zoomLevel+=1;
    });
    globalShortcut.register("CommandOrControl+O", () => {
      if(win.webContents.zoomLevel>=0)
      win.webContents.zoomLevel-=1;
  });
  globalShortcut.register("CommandOrControl+R", () => {
    win.webContents.zoomLevel=0;
});
 globalShortcut.register("CommandOrControl+Q", () => {
 app.quit()
});
globalShortcut.register("CommandOrControl+F5", () => {
  win.webContents
        .capturePage({
            x: 0,
            y: 0,
            width: 800,
            height: 600,
        }) .then((img) => {
          clipboard.writeText(img);
        })
 });
}

app.on("ready", newApp);