import { apiSlice } from "../../api/apiSlice";
import { setUser } from "../auth/authSlice";

export const chatbotApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        chat: builder.mutation({
            query: (message) => ({
                url: 'chat',
                method: "POST",
                body: { message },
                credentials: "include"
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
        })
    })
})

export const { useChatMutation } = chatbotApi;