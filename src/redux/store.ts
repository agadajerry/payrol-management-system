import { configureStore } from "@reduxjs/toolkit";
import appReducerSlice from "./appReducerSlice";
import registerationSlice from "./authReducerSlice";
export const store = configureStore({
  reducer: {
    authReducer: registerationSlice,
    appReducer: appReducerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
