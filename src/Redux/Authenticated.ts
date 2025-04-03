import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false as boolean, // Ensures it's a boolean
};

const Authenticatedslice = createSlice({
  name: "authenticatedslice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.authenticated = action.payload;
    },
    RemoveAuth: (state) => {
      state.authenticated = false;
    },
  },
});
export const { setAuth, RemoveAuth } = Authenticatedslice.actions;

export default Authenticatedslice.reducer;
