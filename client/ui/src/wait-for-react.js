// wait-for-react.js
const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;
process.env.ELECTRON_START_URL = `http://localhost:${port}`;
const client = new net.Socket();
let startedElectron = false;

const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;
            const exec = require('child_process').exec;
            exec('npm run electron');
        }
    }
);

tryConnection();client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});

// PROD RELEASE URL
/*
const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});
mainWindow.loadURL(startUrl);
*/