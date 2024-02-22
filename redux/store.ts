"use client";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import { authSlice, TOKEN } from "./auth/slice";
import { authServiceApi } from "./authService/authServiceEndpoints";
import courseSlice from "./courses/slice/courseSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authServiceApi.reducerPath]: authServiceApi.reducer,
    course: courseSlice.reducer,
    auth: authSlice.reducer
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware, authServiceApi.middleware),
});


setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
