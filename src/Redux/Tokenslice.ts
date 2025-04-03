import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  userprofile: {} as any, // Stores decoded token data
  token: null,
  userbio: [],
  error: "",
};

const tokenslice = createSlice({
  name: "Tokenslice",
  initialState,
  reducers: {
    storeprofile: (state, action) => {
      state.userprofile = action.payload; // Store user data
    },
    logout: (state) => {
      state.userprofile = {}; // Reset user profile on logout
      state.token = null;
      state.userbio = [];
    },
    storeToken: (state, action) => {
      // Ensure action.payload is an object and contains the token key
      if (
        action.payload &&
        typeof action.payload === "object" &&
        "token" in action.payload
      ) {
        state.token = action.payload.token; // Extract the actual token string
      } else {
        console.error("Invalid token format:", action.payload);
        state.token = null;
        state.userbio = [];
        return; // Exit function to prevent decoding error
      }

      try {
        state.userbio = jwtDecode(state.token as any); // Decode only if token is valid
      } catch (error) {
        state.userbio = [];
      }
    },

    removeToken: (state) => {
      (state.token = null), (state.userbio = []);
    },

    showError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { storeprofile, logout, storeToken, removeToken, showError } =
  tokenslice.actions;
export default tokenslice.reducer;
