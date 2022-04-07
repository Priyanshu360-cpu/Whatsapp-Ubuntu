const { app, globalShortcut, BrowserWindow, Notification,  shell } = require("electron");
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
var alerter = {
  title: 'Whatsapp',
  subtitle: 'LINUX',
  body: 'Opened in Browser',
  silent: false,
  icon: path.join(__dirname, './images/174879.png'),
  hasReply: true
}
const agents = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36';
const contextMenu = require('electron-context-menu');
contextMenu({
	showSaveImageAs: true,
  showInspectElement: false,
  showCopyImage: true

});
function newApp() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        icon: path.join(__dirname,'./images/174879.png'),
        webPreferences: {
          devTools: false
          }
      })
      win.loadURL('https://web.whatsapp.com/', { userAgent: agents });
      win.webContents.reloadIgnoringCache();
      globalShortcut.register("CommandOrControl+I", () => {
        if(win.webContents.zoomLevel<=3)
        win.webContents.zoomLevel+=1;
    });
    win.on('page-title-updated', () => {
      const title = win.getTitle();
      win.webContents.setWindowOpenHandler(details => {
        if (details.url != win.webContents.getURL()) {
            alerter.body=`${details.url.split('/')[2].split('.')[0]=="www"?details.url.split('/')[2].split('.')[1]:details.url.split('/')[2].split('.')[0]} Opened in Browser`
            shell.openExternal(details.url);
            let myNo = new Notification(alerter);
            myNo.show();
        }
    });
      var o=0;
      for(let i=0;i<ignored.length;i++){
if(title==ignored[i]) o=1;
      }
      if(o==0){
        let myNotification = new Notification(options);
        myNotification.show();
        ignored.push(title)
        var checker=title;
        setInterval(()=>{if(checker!=title)ignored=["whatsapp","WhatsApp Web","WhatsApp"]},5000)
      };
      o=0;
    })
    globalShortcut.register("CommandOrControl+O", () => {
      if(win.webContents.zoomLevel>=0)
      win.webContents.zoomLevel-=1;
  });
  globalShortcut.register("CommandOrControl+R", () => {
    win.webContents.reloadIgnoringCache();
});
  globalShortcut.register("CommandOrControl+L", () => {
    win.webContents.zoomLevel=0;
});
 globalShortcut.register("CommandOrControl+Q", () => {
 app.quit()
});
globalShortcut.register("CommandOrControl+Shift+I", () => {
  const disable = {
    title: 'Whatsapp',
    subtitle: 'LINUX',
    body: 'Not Permitted',
    silent: false,
    icon: path.join(__dirname, './images/174879.png'),
    hasReply: true
  }
  let myNo = new Notification(disable);
            myNo.show();
 });
 globalShortcut.register("CommandOrControl+K", () => {
  const disable = {
    title: 'Whatsapp',
    subtitle: 'LINUX',
    body: `    CTRL+I -- ZOOM IN
    CTRL+O -- ZOOM OUT
    CTRL+L -- RESET ZOOM LEVEL
    CTRL+R -- RELOAD SCREEN
    CTRL+F5 -- SCREENSHOT A PAGE
    CTRL+Q -- QUIT SCREEN`,
    silent: false,
    icon: path.join(__dirname, './images/174879.png'),
    hasReply: true
  }
  let myN = new Notification(disable);
  myN.show();
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