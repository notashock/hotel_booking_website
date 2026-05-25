import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ── Request Interceptor: Attach JWT Bearer Token ──
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response Interceptor: Handle 401 & extract errors ──
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Auto-logout ONLY on 401 (token expired / invalid / missing)
      // Do NOT logout on 403 — the user is authenticated but lacks permission for that specific resource
      if (status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Only redirect if not already on login/register page
        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/register")
        ) {
          window.location.href = "/login";
        }
      }

      // Extract backend error message from ApiResponse wrapper
      const backendMessage =
        error.response.data?.message || "An unexpected error occurred";
      return Promise.reject(new Error(backendMessage));
    }

    return Promise.reject(new Error("Network error. Please try again."));
  }
);

export default API;