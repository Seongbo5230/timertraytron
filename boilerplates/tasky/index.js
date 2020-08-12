const path = require("path");
const electron = require("electron");
const TimerTray = require("./app/timer_tray");

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === "darwin" ? "iconTemplate.png" : "windows-icon.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new TimerTray(iconPath);
  tray.on("click", (event, bounds) => {
    // Click event bounds
    const { x, y } =
      process.platform === "linux"
        ? electron.screen.getCursorScreenPoint()
        : bounds;

    // Window height and width
    const { height, width } = mainWindow.getBounds();

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPosition = process.platfrom === "darwin" ? y : y - height;
      mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height: height,
        width: width,
      });
      mainWindow.show();
    }
  });
});
