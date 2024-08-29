import net from "net";
import { WebSocket, WebSocketServer } from "ws";

export interface VehicleData {
  battery_temperature: number;
  timestamp: number;
}

const TCP_PORT = 12000;
const WS_PORT = 8080;
const TEMP_MAX = 80;
const TEMP_MIN = 20;

/**
 * tcp server accepts response from the dataemulator
 * this information comes via a json file to a socket
 * of this tcp server.
 */
const tcpServer = net.createServer();
/**
 * websocket server is used to 
 */
const websocketServer = new WebSocketServer({ port: WS_PORT });

//let criticalTempMsgs:VehicleData[] = []


tcpServer.on("connection", (socket) => {
  console.log("TCP client connected");

  socket.on("data", (msg) => {
    console.log(`Received: ${msg.toString()}`);
    
    //////////
    let msg_string = msg.toString()

    if(msg_string.endsWith("}}")){
      //removing last character where the additional "}" was added  
      msg_string = msg_string.slice(0,-1)
    }


    const jsonData: VehicleData = JSON.parse(msg_string);

    
    ///////////
    // Send JSON over WS to frontend clients
    websocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  socket.on("end", () => {

    console.log("Closing connection with the TCP client");
  });

  socket.on("error", (err) => {

    console.log("TCP client error: ", err);
  });
});

websocketServer.on("listening", () =>
  console.log(`Websocket server started on port ${WS_PORT}`)
);

websocketServer.on("connection", async (ws: WebSocket) => {
  console.log("Frontend websocket client connected");
  ws.on("error", console.error);
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`TCP server listening on port ${TCP_PORT}`);
});
