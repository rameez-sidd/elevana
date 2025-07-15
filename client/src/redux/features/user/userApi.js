import { apiSlice } from "../../api/apiSlice";
import { setUser } from '../auth/authSlice';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body: { avatar },
                credentials: "include",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    dispatch(setUser({
                        user: response.data?.user,
                    }));

                } catch (error) {
                    console.log(error);

                }
            }
        }),
        updateProfile: builder.mutation({
            query: ({ name }) => ({
                url: "update-user-info",
                method: "PUT",
                body: { name },
                credentials: "include",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    dispatch(setUser({
                        user: response.data?.user,
                    }));

                } catch (error) {
                    console.log(error);

                }
            }
        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "update-user-password",
                method: "PUT",
                body: { oldPassword, newPassword },
                credentials: "include",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    dispatch(setUser({
                        user: response.data?.user,
                    }));

                } catch (error) {
                    console.log(error);

                }
            }
        }),
        getAllUsers: builder.query({
            query:() => ({
                url: 'get-users',
                method: 'GET',
                credentials: 'include'
            })
        }),

    })
})

export const { useUpdateAvatarMutation, useUpdateProfileMutation, useUpdatePasswordMutation, useGetAllUsersQuery } = userApi;