import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

let _accessToken = null;

//export function to set the access token
export const setStoredToken = (token) => {
  _accessToken = token;
};

const apiHelper = axios.create({
  baseURL: api_url,
  withCredentials: true, 
});

const refreshAccessToken = async () => {
  try {
    // We use raw 'axios' here to avoid our own interceptors
    const response = await axios.get(`${api_url}/auth/refresh`, { 
      withCredentials: true 
    });
    const { access_token } = response.data;
    
    setStoredToken(access_token);
    return access_token;
  } catch (error) {
    // If refresh fails, clear everything and redirect
    setStoredToken(null);
    window.location.href = "/login";
    return Promise.reject(error);
  }
};

// 3. Request Interceptor: Attach Token from Memory
apiHelper.interceptors.request.use(
  (config) => {
    if (_accessToken) {
      config.headers["Authorization"] = `Bearer ${_accessToken}`;
    }
    // Standard JSON content type
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json"; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 4. Response Interceptor: Handle 401 & Retry
apiHelper.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. Check if the URL that failed was the refresh endpoint itself
    const isRefreshEndpoint = originalRequest.url.includes("/auth/refresh");

    // 2. Only retry if it's a 401, NOT a retry, and NOT the refresh endpoint
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !isRefreshEndpoint // <--- ADD THIS CHECK
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiHelper(originalRequest);
      } catch (refreshError) {
        // If refresh fails,Reject.
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiHelper;