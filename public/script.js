const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

// Establish a WebSocket connection with the server
// Use wss for secure connections (https)
const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const socket = new WebSocket(`${protocol}://${window.location.host}/api/websocket`);

socket.onopen = () => {
  console.log('Connected to the WebSocket server.');
  addMessageToLog('System', 'Connected to the server.');
};

socket.onmessage = (event) => {
  // Vercel's WebSocket implementation for serverless functions might send stringified data.
  // Let's handle both plain text and JSON stringified messages.
  let messageData;
  try {
    messageData = JSON.parse(event.data);
  } catch (e) {
    // If it's not a valid JSON, treat it as a plain text message
    // In a more robust implementation, you would define a strict message format.
    // For this example, we'll assume messages from other web clients are strings
    // and we'll display them directly. We'll also assume Roblox might send a string.
    console.log('Received non-JSON message:', event.data);
    // We need to decide how to display this. Let's assume a sender and message.
    // For simplicity, let's just show the raw message.
    addMessageToLog('Unknown', event.data);
    return;
  }

  // Assuming the message is a JSON object with 'sender' and 'message' properties
  if (messageData.sender && messageData.message) {
      addMessageToLog(messageData.sender, messageData.message);
  }
};

socket.onclose = () => {
  console.log('Disconnected from the WebSocket server.');
  addMessageToLog('System', 'Disconnected from the server.');
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
  addMessageToLog('System', 'Connection error.');
};

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = chatInput.value;
  if (message) {
    // We'll send the message as a JSON string to establish a clear protocol
    const messageData = {
      sender: 'WebApp',
      message: message
    };
    socket.send(JSON.stringify(messageData));
    chatInput.value = '';
  }
});

function addMessageToLog(sender, message) {
  const messageElement = document.createElement('div');
  // Handle cases where the message might be an object (from the server broadcasting)
  if (typeof message === 'object' && message !== null) {
      try {
          message = JSON.stringify(message);
      } catch (e) {
          message = 'Unsupported message format';
      }
  }

  // Simple differentiation for who is talking
  if (sender === 'WebApp') {
      messageElement.innerHTML = `<strong>You:</strong> ${message}`;
  } else {
      messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  }
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the latest message
}
