import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/clients";
import authService from "./authServices";
import axios from "axios"

export const login: any = createAsyncThunk(
  "auth/login",
  async (formValues: any, thunkApi) => {
    const signInData = {
      password: formValues.password,
      email: formValues.email,
    };
    try {
      const result = await authService.login(signInData);
      return result;
    } catch (error: any) {

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

      return thunkApi.rejectWithValue("Error has occured.");
    }
  }
);
export const registerUser: any = createAsyncThunk(
  "auth/register",
  async (formValues: any, { rejectWithValue }) => {
    const formValue = {
      password: formValues.password,
      website: formValues.website,
      company_name: formValues.company_name,
      address: formValues.address,
      phone_no: formValues.phone_no,
      email: formValues.email,
    };
    try {
      return await authService.register(formValue);
    } catch (error: any) {

          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
      return rejectWithValue("Error has occured.");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

const initalValue = {
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
  userToken: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initalValue,
  reducers: {
    setCurrentPage: () => {},

    reset: (state) => {
      state.loading = false;
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.message = "";
      state.isError = false;
    },
  },

  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.userToken = action.payload;
      state.isError = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
      state.userToken = null;
    });

    // Register User
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "Registered successful. You can login now";
      state.userToken = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.message = action.payload;
      state.userToken = null;
    });

    // Logout
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.isError = false;
      state.userToken = null;
    });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
