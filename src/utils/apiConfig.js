// src/utils/apiConfig.js

// //Backend base API
// const BASE_URL = "https://swiftship-be-bxcwgcbzauhuekas.canadacentral-01.azurewebsites.net/api";

// // Socket.IO server (no trailing slash)
// const SOCKET_IO_URL = "https://swiftship-be-bxcwgcbzauhuekas.canadacentral-01.azurewebsites.net";

// const BASE_URL = "https://swiftship-backend-production.up.railway.app/api";

// Socket.IO server (no trailing slash)
// const SOCKET_IO_URL = "https://swiftship-backend-production.up.railway.app";
// Production (Railway)
// const BASE_URL = "https://swiftship-backend-production.up.railway.app/api";
// const SOCKET_IO_URL = "https://swiftship-backend-production.up.railway.app";

// Environment Variables (Vite requires VITE_ prefix)
const BASE_URL = import.meta.env.VITE_API_URL
const SOCKET_IO_URL = import.meta.env.VITE_SOCKET_URL

// Note: To change these, update your .env file:
// VITE_API_URL=https://swiftship-backend-production.up.railway.app/api
// VITE_SOCKET_URL=https://swiftship-backend-production.up.railway.app
// Note: import.meta.env.BASE_URL is for the router base, NOT the API URL.
export default BASE_URL;
export { BASE_URL, SOCKET_IO_URL };
