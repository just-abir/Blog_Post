import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    handleToggleBtn: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { handleToggleBtn } = themeSlice.actions;

export default themeSlice.reducer;
