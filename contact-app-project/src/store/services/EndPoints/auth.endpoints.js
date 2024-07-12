import { apiService } from "../apiService";

const authEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (loginData) => ({
        url: `/login`,
        method: "POST",
        body: loginData,
      }),
    }),
    signUp: builder.mutation({
      query: (regData) => ({
        url: `/register`,
        method: "POST",
        body: regData,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: `/user-profile`,
        method: "GET",
      }),
    }),
  }),
});
export const { useSignInMutation, useSignUpMutation,useProfileQuery } = authEndpoints;
