import { defineStore } from "pinia";
import api from "@/api/index.js";

export const useAuthStore = defineStore("auth", () => {
  // --- State ---
  const user = ref(null);
  const accessToken = ref(null);
  const refreshToken = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => !!accessToken.value)

  // Helper: store tokens in localStorage
  const setTokens = (access, refresh, user) => {
    accessToken.value = access;
    refreshToken.value = refresh;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  const loadTokens = () => {
    user.value = JSON.parse(localStorage.getItem("user"));
    accessToken.value = localStorage.getItem("accessToken");
    refreshToken.value = localStorage.getItem("refreshToken");
  };

  const clearAuth = () => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // --- Actions ---

  // 1. Login with username & password
  const login = async ({ username, password }) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post("/auth/client/login/", {
        username,
        password,
      });
      setTokens(data.access, data.refresh, data.user);
      user.value = data.user || null;
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
    try {
      const { data } = await api.post("/auth/client/otp/", {
        identifier,
        purpose,
      });
      return data;
    } catch (err) {
      error.value = err.message || "OTP could not be sent";
      throw err;
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
      setTokens(data.access, data.refresh, data.user);
      user.value = data.user || null;
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
    try {
      const { data } = await api.post("/auth/client/register/", payload);
      return data;
    } catch (err) {
      error.value = err.message || "Registration failed";
      throw err;
    }
  };

  // 5. Reset password
  const resetPassword = async ({ identifier, otp, new_password }) => {
    try {
      const { data } = await api.post("/auth/client/reset-password/", {
        identifier,
        otp,
        new_password,
      });
      return data;
    } catch (err) {
      error.value = err.message || "Password reset failed";
      throw err;
    }
  };

  // 6. Refresh access token
  const refreshAccessToken = async () => {
    if (!refreshToken.value) throw new Error("Refresh token not found");
    try {
      const { data } = await api.post("/auth/refresh/", {
        refresh: refreshToken.value,
      });
      accessToken.value = data.access;
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