import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PUBLIC_SERVER_URI,
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url: "refresh",
                method: "GET",
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                  const result = await queryFulfilled;
                  dispatch(
                    userLoggedIn({
                      accessToken: result.data.accessToken,
                      user: result.data.user,
                    })
                  );
                } catch (error) {
                  console.log("Refresh token error", error);
                }
              }
        }),
        loadUser: builder.query({
            query: (data) => ({
                url: "me",
                method: "GET",
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                            
                        })
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        }),
    }),
})

export const { useLoadUserQuery } = apiSlice 