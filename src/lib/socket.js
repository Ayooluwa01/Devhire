// lib/socket.js
import { io } from "socket.io-client";

const socket = io("https://devhire-backend.onrender.com", {
  reconnection: true, // Enable reconnection
  reconnectionDelay: 1000, // Delay before attempting to reconnect (1 second)
  reconnectionAttempts: Infinity, // Retry forever if disconnected
  transports: ["websocket", "polling"], // Ensure it can fallback to polling if websocket fails
});
export default socket;
