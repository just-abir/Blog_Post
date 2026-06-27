import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "../Redux/Slice/authSlice";
import themeSlice from "../Redux/Slice/themeSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import blogSliceReducer from "./Slice/blogSlice";
console.log(storage);
const persistConfig = {
  key: "root",
  version: 1,
  storage: storage.default,
};
const rootReducer = combineReducers({
  auth: authSliceReducer,
  theme: themeSlice,
  blog: blogSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
