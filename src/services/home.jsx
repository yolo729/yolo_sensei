import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "rasing",
  initialState: {
    auth: false,
    dark: true,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setDark: (state, action) => {
      state.dark = action.payload;
    },
  },
});

export const { setAuth, setDark } = homeSlice.actions;

export default homeSlice.reducer;
