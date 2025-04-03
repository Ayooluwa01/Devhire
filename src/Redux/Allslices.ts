import { combineReducers } from "@reduxjs/toolkit";
import Filterslice from "@/Redux/Filterslice";
import Tokenslice from "@/Redux/Tokenslice";
import Authslice from "@/Redux/Authenticated";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// ✅ Fix for SSR: Prevents storage issues during server-side rendering
const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
});
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Token", "Auth"], // Only persist necessary slices
};

// Combine all reducers
const rootReducer = combineReducers({
  Filter: Filterslice, // Will not be persisted
  Token: Tokenslice,
  Auth: Authslice,
});

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
