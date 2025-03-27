import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
