import axios from "axios";

const api = axios.create({
  baseURL: "https://tamrahat.com.tm:8000/api/v1/",
  crossdomain: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': localStorage.getItem('lang') || 'ru',
  },
  xhrFields: {
    withCredentials: true
  }
});

// api.interceptors.request.use((config) => {
//   const selectedLanguage = localStorage.getItem("selectedLanguage") || "TK";
//   config.headers["Accept-Language"] = selectedLanguage;
//   return config;
// });

export default api;