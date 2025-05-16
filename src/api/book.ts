import { api } from "./api";

export const getAllLabels = async () => {
  const response = await api.get("/book/get-labels");
  return response;
}
