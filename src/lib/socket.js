// lib/socket.js
import { io } from "socket.io-client";
const apiUrls = {
  local: "http://localhost:9000",
  phone: "http://192.168.122.198:9000",
  ngrok: "https://your-ngrok-url.ngrok.io",
  production: "https://api.yourdomain.com",
};

const API_URL = apiUrls.local;
const socket = io(`${API_URL}`); // Replace with your server URL

export default socket;
