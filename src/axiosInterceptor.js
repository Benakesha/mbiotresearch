import axios from "axios";

const axiosInterceptor = axios.create({
  baseURL: "http://localhost:3000/api/v1"
});

axiosInterceptor.defaults.headers.common["Content-Type"] = "application/json";

axiosInterceptor.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    return error;
  }
);

axiosInterceptor.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error;
  }
);

export default axiosInterceptor;
