import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/clients";

export const excelFileUpload: any = createAsyncThunk(
  "app/upload",
  async (formValues: any, thunkApi) => {
    console.log(formValues);
    try {
      const response: any = await apiClient.post(
        "/upload-month-payslip",
        formValues
      );
      console.log(response);
      if (response) {
        return response.data;
      }
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const initalValue = {
  year: "",
  month: "",
  file_name: "",
  loading: false,
  error: "",
  success_msg: "",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState: initalValue,
  reducers: {
    setCurrentPage: () => {},
  },

  extraReducers: (builder) => {
    //Upload file
    builder.addCase(excelFileUpload.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(excelFileUpload.fulfilled, (state, action) => {
      state.loading = false;
      state.success_msg = action.payload.msg;
    });
    builder.addCase(excelFileUpload.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default appSlice.reducer;
