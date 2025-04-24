import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PUBLIC_SERVER_URI,
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // If the token is expired or about to expire (within 5 minutes)
    if (result?.error?.status === 401 || 
        (result?.error?.originalStatus === 401 && 
         result?.error?.data?.message?.includes('expired'))) {
        // Try to refresh the token
        const refreshResult = await baseQuery(
            { url: 'refresh', method: 'GET', credentials: 'include' },
            api,
            extraOptions
        );

        if (refreshResult?.data) {
            // Store the new token
            api.dispatch(
                userLoggedIn({
                    accessToken: refreshResult.data.accessToken,
                    user: refreshResult.data.user,
                })
            );
            // Retry the original query with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            // If refresh fails, logout the user
            api.dispatch(userLoggedOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
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

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice 