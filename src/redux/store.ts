import { configureStore } from "@reduxjs/toolkit";
import registerationSlice from "./authReducerSlice";
export const store = configureStore({
  reducer: {
    authReducer: registerationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
