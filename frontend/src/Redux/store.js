import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../Redux/Slice/authSlice";
import themeSlice from "../Redux/Slice/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    theme: themeSlice,
  },
});
