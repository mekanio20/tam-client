import { defineStore } from "pinia";
import { isTokenValid } from "@/composables/jwtDecode";
import api from "@/api/index.js";

export const useAuthStore = defineStore("auth", () => {
  // --- State ---
  let user = localStorage.getItem('user');
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');
  const loading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => {
    return isTokenValid(accessToken)
  })

  // Helper: store tokens in localStorage
  const setTokens = (access, refresh, userData) => {
    accessToken = access;
    refreshToken = refresh;
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  const loadTokens = () => {
    user = JSON.parse(localStorage.getItem("user"));
    accessToken = localStorage.getItem("accessToken");
    refreshToken = localStorage.getItem("refreshToken");
  };

  const clearAuth = () => {
    user = null;
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // --- Actions ---

  // 1. Login with username & password
  const login = async ({ username, identifier, password }) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/auth/client/login/", {
        username,
        identifier,
        password,
      });
      setTokens(data.access, data.refresh, data.user);
      user = data.user || null;
      return data;
    } catch (err) {
      error.value = err.message || "Login failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 2. Send OTP to phone
  const sendOtp = async ({ identifier, purpose = "registration" }) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/auth/client/otp/", {
        identifier,
        purpose,
      });
      return data;
    } catch (err) {
      error.value = err.message || "OTP could not be sent";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 3. Login with phone + OTP
  const otpLogin = async ({ identifier, otp }) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/auth/client/otp-login/", {
        identifier,
        otp,
      });
      user = data.user || null;
      return data;
    } catch (err) {
      error.value = err.message || "Login with OTP failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 4. Register new user
  const register = async (payload) => {
    // payload = { otp, first_name, last_name, identifier, password }
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/auth/client/register/", payload);
      setTokens(data.data.access, data.data.refresh, data.data.user);
      return data;
    } catch (err) {
      error.value = err.message || "Registration failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 5. Reset password
  const resetPassword = async ({ identifier, otp, new_password }) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/auth/client/reset-password/", {
        identifier,
        otp,
        new_password,
      });
      setTokens(data.data.access, data.data.refresh, data.data.user);
      return data;
    } catch (err) {
      error.value = err.message || "Password reset failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 6. Refresh access token
  const refreshAccessToken = async () => {
    if (!refreshToken) throw new Error("Refresh token not found");
    try {
      const { data } = await api.post("/auth/refresh/", {
        refresh: refreshToken,
      });
      accessToken = data.access;
      localStorage.setItem("accessToken", data.access);
      return data;
    } catch (err) {
      error.value = err.message || "Token refresh failed";
      throw err;
    }
  };

  return {
    // State
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    loading,
    error,
    // Helpers
    loadTokens,
    clearAuth,
    // Actions
    login,
    sendOtp,
    otpLogin,
    register,
    resetPassword,
    refreshAccessToken,
  };
});