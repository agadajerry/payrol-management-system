import axios from "axios";
import apiClient from "../api/clients";


const payKey:string = "payroll_key"
// Register user
const register = async (userData: any) => {
   console.log(userData)
  const response = await apiClient.post("/register", userData);
console.log(response.data)
  if (response.data) {
    localStorage.setItem(
      payKey,
      JSON.stringify(response.data.data.token)
    );
  }

  return response.data;
};

// Login user
const login = async (userData: any) => {
   const response = await apiClient.post("/login", userData);
   
   if (response.data.data.token) { 
       localStorage.setItem(payKey, JSON.stringify(response.data.data.token));
   }
 
  return response.data.data.token;
};

// Logout payrol_key
const logout = () => {
  localStorage.removeItem(payKey);
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
