import axios, { InternalAxiosRequestConfig } from "axios";

export interface IError {
  message: string;
  status?: number;
}

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use(authRequestInterceptor);
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token.replace(/"/g, "")}`;
    }
  }
  return config;
}
