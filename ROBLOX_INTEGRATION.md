# Roblox Integration Guide

Exciting news! Roblox Studio now has **official built-in support for WebSockets**, making it easier than ever to connect your plugins to external services. You no longer need a third-party library.

This guide has been updated to use the new official API.

## 1. How to Connect

You will use the `HttpService:CreateWebStreamClient()` function to establish a connection with your deployed web application.

## 2. Sample Luau Script

Here is a sample Luau script demonstrating how to connect to the WebSocket server, send a message, and handle incoming messages using the new API.

You will need to replace `YOUR_VERCEL_APP_URL` with the URL of your deployed Vercel application (e.g., `my-chatbot.vercel.app`).

```lua
local HttpService = game:GetService("HttpService")

-- Replace with your Vercel app URL (e.g., "your-app-name.vercel.app")
local YOUR_VERCEL_APP_URL = "your-app-name.vercel.app"
local url = "wss://" .. YOUR_VERCEL_APP_URL .. "/api/websocket"

-- Define a function to handle incoming messages
local function handleMessage(message)
	print("Received message from server: " .. message)

    -- Decode the JSON message
    local success, messageData = pcall(function()
        return HttpService:JSONDecode(message)
    end)

    if success then
        -- Handle the message data from the web UI or other clients
        print("Sender: " .. tostring(messageData.sender))
        print("Message: " .. tostring(messageData.message))
    else
        warn("Failed to decode incoming JSON message.")
    end
end

-- Define a function to handle errors
local function handleError(err)
    warn("A WebSocket error occurred: " .. tostring(err))
end

-- Create the WebSocket client
-- The connection attempt begins immediately
local ws_client = HttpService:CreateWebStreamClient(Enum.WebStreamClientType.WebSocket, {
	Url = url
})

-- Connect the event handlers
ws_client.MessageReceived:Connect(handleMessage)
ws_client.Error:Connect(handleError)

print("WebSocket client created. Connection is being established.")

-- To send a message, use the Send() method.
-- This can be done immediately after creation; the request is queued until connected.
local messageToSend = {
    sender = "RobloxPlugin",
    message = "Hello from the official Roblox WebSocket API!"
}
local jsonMessage = HttpService:JSONEncode(messageToSend)

ws_client:Send(jsonMessage)
print("Initial message sent to the server.")

-- To send a message from your plugin's UI later, you would call:
-- local messageData = { sender = "RobloxPlugin", message = "Your message here" }
-- ws_client:Send(HttpService:JSONEncode(messageData))
```

## 3. Important Notes

*   **Studio Only:** This feature is restricted to Roblox Studio. Any `CreateWebStreamClient()` requests made in a live experience will be blocked.
*   **HttpService:** You must have `HttpService` enabled in your Roblox game settings for this to work.
*   **WSS Protocol:** Always use `wss://` for the WebSocket URL, as your Vercel application will be served over HTTPS, which provides a secure connection.
*   **JSON Format:** The web frontend and backend are designed to communicate using JSON messages with `sender` and `message` properties. Ensure your Roblox plugin sends and expects messages in this format for compatibility.
