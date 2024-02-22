import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from 'redux-persist'

export const baseAuthApi = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URI}/auth`,

  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath]
    }

    if (
      action.type === REHYDRATE &&
      action.key === 'key used with redux-persist'
    ) {
      return action.payload
    }
  },
  
  endpoints: (builder) => ({}),
});

