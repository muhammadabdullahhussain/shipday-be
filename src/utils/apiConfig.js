// src/utils/apiConfig.js

// //Backend base API
// 
// Use environment variables or fallback to localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SOCKET_IO_URL = import.meta.env.VITE_SOCKET_IO_URL || "http://localhost:5000";

export default BASE_URL;
export { BASE_URL, SOCKET_IO_URL };
