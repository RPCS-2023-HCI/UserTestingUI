// deps - aws stuff
const awsiot = require('aws-iot-device-sdk-v2');
const iot = awsiot.iot;
const mqtt = awsiot.mqtt;

// deps - web server stuff
const express = require('express');
const ws = require('ws');
const path = require('path');
const uuidv4 = require('uuid').v4;
const app = express();

// aws stuff
function aws_setup() {
  let config_builder = iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path('./secrets/hci_ui.cert.pem', './secrets/hci_ui.private.key');
  config_builder.with_client_id('hci_ui');
  config_builder.with_endpoint('aicgt013q5xy-ats.iot.us-east-1.amazonaws.com');
  config_builder.with_certificate_authority_from_path(undefined, './secrets/root-CA.crt');

  const config = config_builder.build();
  const client = new mqtt.MqttClient();
  return client.new_connection(config);
}
let connection = aws_setup();

connection.connect().catch((error) => { console.log("Connect error: " + error); });
// connection.publish("rpcs/testing", `hello, world! `, mqtt.QoS.AtLeastOnce).then(() => {console.log("pub ok");}).catch((error) => {console.log("PUB error: " + error); });

// express stuff
app.use(express.static(path.join(__dirname, '../', 'diagnostic-ui', 'build')));

// connection bridge stuff
let clients = {};

// websocket side
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  const userId = uuidv4();
  console.log(`Received new connection: ${userId}`);

  // Store the new connection and handle messages
  clients[userId] = socket;

  // handle close
  socket.on('close', () => {
    console.log(`Connection closed: ${userId}`);
    delete clients[userId];
  });

  socket.on('message', message => console.log(message));
});

// mqtt side
connection.subscribe("#", mqtt.QoS.AtLeastOnce, (topic, payload, dup, qos, retain) => {
  console.log(`Publish received. topic:"${topic}" dup:${dup} qos:${qos} retain:${retain}`);
  const decoder = new TextDecoder('utf8');
  payload = decoder.decode(payload);
  console.log(`Payload: ${payload}`);

  // broadcast to all
  for(let userId in clients) {
    let client = clients[userId];
    if(client.readyState === ws.WebSocket.OPEN) {
      client.send(JSON.stringify({"data":payload}));
    }
  }
}).then(() => {console.log("sub ok");}).catch((error) => {console.log("sUB error: " + error); });

// TODO: configurable port
const server = app.listen(9000);

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
