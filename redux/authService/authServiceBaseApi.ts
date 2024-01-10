import { createApi, fetchBaseQuery, RootState } from "@reduxjs/toolkit/query/react";
import { prepareHeadersWithAuth } from "../utils/prepareHeadersWithAuth";
import { REHYDRATE } from 'redux-persist'

export const baseAuthApi = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URI}/auth`,
    // prepareHeaders: prepareHeadersWithAuth(),
  //   mode: "no-cors",
  //   prepareHeaders: (headers, { getState }) => {
  //   // If we have a token set in state, let's assume that we should be passing it.
  //     getState()
  
  //   return headers;
  // },
    // prepareHeaders: (headers) => {
    //   headers.set('Access-Control-Allow-Origin', '*') 
    //   headers.set('Content-Type', 'application/json') //
    //   headers.set('Access-Control-Allow-Headers', '*') //
    //   return headers
    // },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    // when persisting the root reducer
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath]
    }

    // when persisting the api reducer
    if (
      action.type === REHYDRATE &&
      action.key === 'key used with redux-persist'
    ) {
      return action.payload
    }
  },
  
  endpoints: (builder) => ({}),
});


// export const { } = apiSlice;
