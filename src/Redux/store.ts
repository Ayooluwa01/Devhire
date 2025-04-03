import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "@/Redux/Allslices"; // Use only persistedReducer
import { persistStore } from "redux-persist"; // Fix import

export const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore serialization errors
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
