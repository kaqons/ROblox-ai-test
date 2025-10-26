# Roblox Integration Guide

To connect your Roblox Studio plugin to the web-based chatbot, you'll need to use a WebSocket client in your Luau script. Roblox's `HttpService` does not natively support WebSockets, so we'll use a third-party library.

## 1. Get a WebSocket Library

You'll need to add a WebSocket client library to your Roblox project. A popular and easy-to-use option is the `WebSocket.lua` module. You can find it on GitHub and add it to your plugin's script environment.

## 2. Sample Luau Script

Here is a sample Luau script that shows how to connect to the WebSocket server, send messages, and receive messages. You will need to replace `YOUR_VERCEL_APP_URL` with the URL of your deployed Vercel application.

```lua
-- Make sure the WebSocket.lua module is in your project and the path is correct
local WebSocket = require(script.Parent.WebSocket)

-- Replace with your Vercel app URL (e.g., "your-app-name.vercel.app")
local YOUR_VERCEL_APP_URL = "your-app-name.vercel.app"
local url = "wss://" .. YOUR_VERCEL_APP_URL .. "/api/websocket"

local client = WebSocket.new(url)

client.OnConnected:Connect(function()
    print("Connected to the WebSocket server!")

    -- Send a message to the server
    local messageData = {
        sender = "RobloxPlugin",
        message = "Hello from Roblox Studio!"
    }
    client:Send(HttpService:JSONEncode(messageData))
end)

client.OnMessage:Connect(function(message)
    print("Received message: " .. message)

    -- Decode the JSON message
    local success, messageData = pcall(function()
        return HttpService:JSONDecode(message)
    end)

    if success then
        -- Handle the message data
        print("Sender: " .. messageData.sender)
        print("Message: " .. messageData.message)
    else
        warn("Failed to decode incoming JSON message.")
    end
end)

client.OnDisconnected:Connect(function(code, reason)
    print("Disconnected from the WebSocket server. Code: " .. tostring(code) .. ", Reason: " .. tostring(reason))
end)

client.OnError:Connect(function(err)
    warn("An error occurred: " .. tostring(err))
end)

-- Connect to the server
client:Connect()

-- To send a message from your plugin's UI, you would call:
-- local messageData = { sender = "RobloxPlugin", message = "Your message here" }
-- client:Send(HttpService:JSONEncode(messageData))
```

## 3. Important Notes

*   **HttpService:** You must have `HttpService` enabled in your Roblox game settings for this to work.
*   **WSS Protocol:** Always use `wss://` for the WebSocket URL, as your Vercel application will be served over HTTPS.
*   **JSON Format:** The web frontend and backend are designed to communicate using JSON messages with `sender` and `message` properties. Make sure your Roblox plugin sends messages in the same format.
