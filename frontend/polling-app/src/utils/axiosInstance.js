import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // global error handling
    if (error.response) {
      if (error.response.status === 401) {
        //token expired or unauthorized
        console.error("Unauthorized! Redirecting to Login...");
        //redirect to login page
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server Error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timedout. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;