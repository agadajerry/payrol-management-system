import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/clients";

export const login: any = createAsyncThunk(
  "auth/login",
  async (formValues: any, thunkApi) => {
    const signInData = {
      password: formValues.password,
      email: formValues.email,
    };
    try {
      const response: any = await apiClient.post(
        "/sign-in",
        JSON.stringify(signInData)
      );

      if (!response.data.auth_id) {
        return thunkApi.rejectWithValue(response.data);
      }
      localStorage.setItem("payrol_key", JSON.stringify(response.data.auth_id));
      window.location.href = "/home";
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);
export const registerUser: any = createAsyncThunk(
  "auth/register",
  async (formValues: any, { rejectWithValue }) => {
    const formValue = {
      password: formValues.password,
      website: formValues.website,
      name: formValues.name,
      address: formValues.address,
      phone_no: formValues.phone_no,
      email: formValues.email,
    };
    try {
      const response = await apiClient.post("/sign-up", formValue);
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
      state.success_msg = action.payload;
    
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Register User
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success_msg = action.payload.msg;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "Something went wrong";
    });
  },
});

export default authSlice.reducer;
