import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";
import { resetAdmin } from "../admin/adminSlice";
import { resetCourseCreation } from "../courses/courseCreationSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        register: builder.mutation({
            query: (data) => ({
                url: '/registration',
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    dispatch(userRegistration({
                        token : response.data.activationToken,
                    }));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        activate: builder.mutation({
            query: ({activation_token, activation_code}) => ({
                url: "/activate-user",
                method: "POST",
                body: {activation_token, activation_code},  
            })
        }),
        login: builder.mutation({
            query: ({email, password}) => ({
                url: "/login",
                method: "POST",
                body: {email, password},
                credentials: 'include',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    dispatch(userLoggedIn({
                        token: response.data.accessToken,
                        user: response.data.user,
                    }));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logOut: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET",
                credentials: "include",
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    await queryFulfilled;
                    dispatch(userLoggedOut());
                    dispatch(resetAdmin());
                    dispatch(resetCourseCreation());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
    })
})

export const { 
    useRegisterMutation, 
    useActivateMutation, 
    useLoginMutation,
    useLogOutMutation,
} = authApi;