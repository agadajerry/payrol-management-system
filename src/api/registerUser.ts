import { IRegisteration } from "../utils/interfaces";
import apiClient from "./clients";

export const registerUser = async (user: IRegisteration) => {
  const response = await apiClient.post("/register", user);
  return response.data;
};
