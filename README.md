# Roblox Studio Web Chatbot

This project is a web-based chatbot UI that connects in real-time to a Roblox Studio plugin, allowing for seamless communication between the web and your game development environment. It is built with a simple HTML/CSS/JS frontend and a Node.js WebSocket backend, designed for easy, free deployment on [Vercel](https://vercel.com/).

## Features

-   **Real-Time Communication:** Uses WebSockets for instant, bidirectional messaging.
-   **Always-On:** Deployed as a serverless application, so it's always available.
-   **Simple UI:** A clean, lightweight chat interface.
-   **Free to Host:** Designed specifically for Vercel's free tier.
-   **Roblox Integration:** Includes instructions for connecting your Roblox Studio plugins.

## How It Works

The application consists of two main parts:

1.  **Frontend (`/public`):** A static website with HTML, CSS, and JavaScript that provides the chat interface. It connects to the backend using a WebSocket.
2.  **Backend (`/api`):** A Node.js serverless function that runs a WebSocket server. It receives messages from any connected client (the web UI or a Roblox plugin) and broadcasts them to all other connected clients.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (which includes npm) installed on your machine.
-   A [Vercel account](https://vercel.com/signup) for deployment.
-   The [Vercel CLI](https://vercel.com/docs/cli) (optional, but recommended).

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    This project is intended for a serverless environment, but you can simulate it locally using `vercel dev`.
    ```bash
    npm install -g vercel # If you don't have the Vercel CLI
    vercel dev
    ```
    This will start a local server, usually on `http://localhost:3000`, that serves the frontend and runs the serverless function. You can open this URL in your browser to see the chat UI.

## Deployment to Vercel

This project is configured for a seamless deployment to Vercel.

### Option 1: Using the Vercel Website (Easiest)

1.  **Fork this repository** to your own GitHub account.
2.  **Go to your Vercel Dashboard** and click **"Add New... > Project"**.
3.  **Import the repository** you just forked from GitHub.
4.  **Vercel will automatically detect the settings** from the `vercel.json` file. No configuration is needed.
5.  **Click "Deploy"**.

That's it! Vercel will build and deploy your application. Once it's finished, you will be given a live URL (e.g., `your-project-name.vercel.app`).

### Option 2: Using the Vercel CLI

1.  **Log in to your Vercel account:**
    ```bash
    vercel login
    ```

2.  **Deploy the project from your terminal:**
    ```bash
    vercel --prod
    ```
    Follow the on-screen prompts. Vercel will link the project to your account and deploy it.

## Connecting Roblox Studio

After deploying your application, use the live URL to connect your Roblox plugin. Follow the instructions in `ROBLOX_INTEGRATION.md` to set up your Luau script.
