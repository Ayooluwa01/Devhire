// import { createSlice } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";

// type UserBio = {
//   user_id: number;
//   email: string;
//   name: string;
//   role: string;
//   iat?: number;
//   exp?: number;
//   [key: string]: any;
// };

// // ✅ Typed initial state
// type TokenState = {
//   userprofile: any;
//   token: string | null;
//   userbio: UserBio | null;
//   error: string;
//   role: string;
//   profile: any;
// };

// const initialState = {
//   userprofile: {},
//   token: null,
//   userbio: null,
//   error: "",
//   role: "",
//   profile: {},
// };

// const tokenslice = createSlice({
//   name: "Tokenslice",
//   initialState,
//   reducers: {
//     // storeToken: (state, action) => {
//     //   if (
//     //     action.payload &&
//     //     typeof action.payload === "object" &&
//     //     "token" in action.payload
//     //   ) {
//     //     state.token = action.payload.token;
//     //   } else {
//     //     console.error("Invalid token format:", action.payload);
//     //     state.token = null;
//     //     state.userbio = [];
//     //     return;
//     //   }

//     //   try {
//     //     // Decode the token to get the user info
//     //     const decoded = jwtDecode(state.token);
//     //     state.userbio = decoded;

//     //   } catch (error) {
//     //     state.userbio = [];
//     //   }
//     // },

//     // storeToken: (state, action) => {
//     //   if (action.payload && typeof action.payload === "object" && "token" in action.payload) {
//     //     state.token = action.payload.token;
//     //   } else {
//     //     console.error("Invalid token format:", action.payload);
//     //     state.token = null;
//     //     state.userbio = [];
//     //     return;
//     //   }

//     //   if (state.token) {
//     //     try {
//     //       state.userbio = jwtDecode(state.token); // Decode the token only if it's not null
//     //       console.log("this is userbio", state.userbio);

//     // state.role = state.userbio.role;

//     // // Store the role in a cookie for use in middleware
//     // setCookie("role", state.role, {
//     //   httpOnly: false, // You can set this true if you don't need to access it client-side
//     //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//     //   sameSite: "Lax",
//     // });

//     //     } catch (error) {
//     //       console.error("Error decoding token", error);
//     //       state.userbio = [];
//     //     }
//     //   } else {
//     //     console.error("Token is null or undefined");
//     //     state.userbio = [];
//     //   }
//     // },

//     storeToken: (state, action) => {
//       if (
//         action.payload &&
//         typeof action.payload === "object" &&
//         "token" in action.payload
//       ) {
//         state.token = action.payload.token;
//       } else {
//         console.error("Invalid token format:", action.payload);
//         state.token = null;
//         state.userbio = [];
//         return;
//       }

//       if (state.token) {
//         try {
//           // Decode the token only if it's not null
//           state.userbio = jwtDecode<UserBio>(state.token);
//           console.log("This is the userbio", state.userbio);
//           // Assign the role if it exists in the decoded token
//           state.role = state.userbio?.role || "";

//           // Store the role in a cookie for use in middleware
//           Cookies.set("role", state.role, {
//             httpOnly: false, // You can set this true if you don't need to access it client-side
//             secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//             sameSite: "Lax",
//           });
//         } catch (error) {
//           state.userbio = [];
//         }
//       } else {
//         state.userbio = [];
//       }
//     },

//     logout: (state) => {
//       state.userprofile = {}; // Reset user profile on logout
//       state.token = null;
//       state.userbio = [];
//     },
//     removeToken: (state) => {
//       state.token = null;
//       state.userbio = [];
//       state.role = "";
//     },

//     showError: (state, action) => {
//       state.error = action.payload;
//     },
//     storeprofile: (state, action) => {
//       state.userprofile = action.payload;
//     },
//   },
// });

// export const { storeToken, removeToken, logout, showError, storeprofile } =
//   tokenslice.actions;
// export default tokenslice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// ✅ Define the type
type UserBio = {
  user_id: number;
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
};

// ✅ Typed initial state
type TokenState = {
  userprofile: any;
  token: string | null;
  userbio: UserBio | null;
  error: string;
  role: string;
  profile: any;
};

// ✅ Use the correct types for initialState
const initialState: TokenState = {
  userprofile: {},
  token: null,
  userbio: null,
  error: "",
  role: "",
  profile: {},
};

const tokenslice = createSlice({
  name: "Tokenslice",
  initialState,
  reducers: {
    storeToken: (state, action) => {
      if (
        action.payload &&
        typeof action.payload === "object" &&
        "token" in action.payload
      ) {
        state.token = action.payload.token;
      } else {
        // console.error("Invalid token format:", action.payload);
        state.token = null;
        state.userbio = null;
        return;
      }

      if (state.token) {
        try {
          state.userbio = jwtDecode<UserBio>(state.token);

          state.role = state.userbio?.role || "";

          Cookies.set("role", state.role, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
          });
        } catch (error) {
          // console.error("Error decoding token", error);
          state.userbio = null;
        }
      } else {
        state.userbio = null;
      }
    },

    logout: (state) => {
      state.userprofile = {};
      state.token = null;
      state.userbio = null;
    },

    removeToken: (state) => {
      state.token = null;
      state.userbio = null;
      state.role = "";
    },

    showError: (state, action) => {
      state.error = action.payload;
    },

    storeprofile: (state, action) => {
      state.userprofile = action.payload;
    },
  },
});

export const { storeToken, removeToken, logout, showError, storeprofile } =
  tokenslice.actions;
export default tokenslice.reducer;
