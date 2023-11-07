import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "http://127.0.0.1:8000/color_city/api",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     // "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
//     // Other headers if needed
//   },
//   // Other configuration options if needed
// });

// Production Only
const apiClient = axios.create({
  baseURL: "https://color-city-backend.onrender.com/color_city/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", 
    "Access-Control-Allow-Origin": "https://color-city-backend.onrender.com"
    // "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
    // Other headers if needed
  },
  // Other configuration options if needed
});

export default apiClient;
