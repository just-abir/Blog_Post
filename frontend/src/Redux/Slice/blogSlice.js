import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: [],
  loading: false,
  error: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export const { setBlog, setLoading } = blogSlice.actions;
export default blogSlice.reducer;
