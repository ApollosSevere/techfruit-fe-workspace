import { baseAuthApi } from "./authServiceBaseApi";

// TODO: Before doing bottom todo, explore swagger docs auto generation
// TODO: Remove "course from the verbage here, maybe add it to an enum to make safe"


// Understand that api and courses folder should be combined
export const authApi = baseAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
        // credentials: "include" as const,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        // credentials: "include" as const,
      }),
    }),

    validateToken: builder.mutation({
      query: (token) => ({
        url: "/validateToken",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        // credentials: "include" as const,
      }),
    }),

    logout: builder.mutation({
      query: (token) => ({
        url: "/logout",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

   
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useValidateTokenMutation,
  useLogoutMutation
} = authApi;

export { authApi as authServiceApi };
