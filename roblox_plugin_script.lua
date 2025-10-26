local HttpService = game:GetService("HttpService")

-- Replace with your Vercel app URL (e.g., "your-app-name.vercel.app")
local YOUR_VERCEL_APP_URL = "ro-blox-ai-test-m2tn14b34-kaqons-projects.vercel.app"
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
