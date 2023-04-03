// deps
const awsIot = require('aws-iot-device-sdk');
const express = require('express');
const path = require('path');
const app = express();

/*const device = awsIot.device({
    clientId: 'hci_ui',
    host: '????.iot.us-east-1.amazonaws.com',
    port: 8883,
    keyPath: './secrets/hci_ui.private.key',
    certPath: './secrets/hci_ui.cert.pem',
});*/


app.use(express.static(path.join(__dirname, '../', 'diagnostic-ui', 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);

