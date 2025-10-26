const WebSocket = require('ws');

let wss;

module.exports = (req, res) => {
  if (!wss) {
    console.log('Creating new WebSocket server.');
    const server = require('http').createServer();
    wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Attempt to parse the message as JSON
        let messageData;
        try {
            // Vercel's environment might require converting buffer to string first
            messageData = JSON.parse(message.toString());
        } catch (e) {
            console.log('Received non-JSON message, broadcasting as is.');
            // If it's not JSON, just broadcast the raw message
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message.toString());
                }
            });
            return;
        }

        // Broadcast the parsed message to all clients
        const broadcastMessage = JSON.stringify(messageData);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(broadcastMessage);
          }
        });
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });

    // This is a workaround for Vercel's serverless environment.
    server.listen(0);
  }

  res.status(200).send('WebSocket server is running.');
};
