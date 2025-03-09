import axios from "axios";

export interface IError {
  message: string;
  status?: number;
}

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});
