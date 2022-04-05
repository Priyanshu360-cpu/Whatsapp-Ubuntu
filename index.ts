const { app, globalShortcut, BrowserWindow, Notification} = require("electron");
const url = require("url");
const path = require('path')
const electron = require('electron');
var ignored=["whatsapp","WhatsApp Web","WhatsApp"];
const { clipboard } = require('electron')
const options = {
  title: 'Whatsapp',
  subtitle: 'LINUX',
  body: 'You Recieved a new Notification ',
  silent: false,
  icon: path.join(__dirname, './images/174879.png'),
  hasReply: true
}
const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36';
function newApp() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        icon: path.join(__dirname,'./images/174879.png')
      })
      win.loadURL('https://web.whatsapp.com/', { userAgent: USER_AGENT });
      globalShortcut.register("CommandOrControl+I", () => {
        if(win.webContents.zoomLevel<=3)
        win.webContents.zoomLevel+=1;
    });
    win.on('page-title-updated', () => {
      const title = win.getTitle();
      var o=0;
      for(let i=0;i<ignored.length;i++){
if(title==ignored[i]) o=1;
      }
      if(o==0){
        let myNotification = new Notification(options);
        myNotification.show();
        ignored.push(title)
      };
      o=0;
    })
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