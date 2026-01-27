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

const BASE_URL = import.meta.env.VITE_API_URL || "/api";
const SOCKET_IO_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;

export default BASE_URL;
export { BASE_URL, SOCKET_IO_URL };
