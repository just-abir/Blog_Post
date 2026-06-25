import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  showPass: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    passOnOff: (state) => {
      state.showPass = state.showPass === false ? true : false;
    },
  },
});

export const { setUser, setLoading, passOnOff } = authSlice.actions;
export default authSlice.reducer;
