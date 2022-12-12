import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/clients";

export const login: any = createAsyncThunk(
  "auth/login",
  async (props: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/login", props.formValues);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const registerUser: any = createAsyncThunk(
  "auth/register",
  async (props: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/sign-up", props.formValues);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initalValue = {
  password: "",
  website: "",
  name: "",
  address: "",
  phone_no: "",
  email: "",
  loading: false,
  error: "",
  success_msg: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initalValue,
  reducers: {
    setCurrentPage: () => {},
  },

  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success_msg = action.payload.message;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Register User
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success_msg = action.payload.message;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "Error has occurred";
    });
  },
});

export default authSlice.reducer;
