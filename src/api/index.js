import axios from "axios";
import { useAuthStore } from "@/stores/auth"

const api = axios.create({
  baseURL: "https://tamrahat.com.tm:8000/api/v1/",
  crossdomain: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': localStorage.getItem('lang') || 'TK',
  },
  xhrFields: {
    withCredentials: true
  }
});

api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = localStorage.getItem('lang');
  const auth = useAuthStore()
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

export default api;