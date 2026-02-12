import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const apiHelper = axios.create({
  baseURL: api_url,
  withCredentials: true, // Ensures cookies are sent if needed
});

const refreshAccessToken = async () => {
  try {
    const response = await axios.get(`${api_url}/auth/refresh`);
    console.log("New Access token api call",response);

    // const newAccessToken = response.data.accessToken;
    // localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    window.location.href = "/";
    // localStorage.removeItem("CurrentUserData");
  }

};

// 🔹 **Request Interceptor: Add Access Token**
apiHelper.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json"; 
    }

    return config;
  },
  (error) => Promise.reject(error)
);


apiHelper.interceptors.response.use(
  (response) => {
    return response; 
  },
  async (error) => {
    const originalRequest = error.config; 

    if ((error.response.status === 401 && error?.response?.data?.message?.trim()==="Access Token expired") && (!originalRequest._retry))
      {
      originalRequest._retry = true;  

      try {
        // Attempt to refresh the access token
        const newAccessToken = await refreshAccessToken();

        // Update the request headers with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return apiHelper(originalRequest); 
      } catch (e) {
        return Promise.reject(e); 
      }
    }

    return Promise.reject(error); 
  }
);

export default apiHelper;


