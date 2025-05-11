import { apiSlice } from "../../api/apiSlice";

export const purchaseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation({
            query: (courseId) => ({
                url: 'checkout/create-checkout-session',
                method: 'POST',
                body: courseId,
                credentials: 'include'
            })
        }),


    })
})

export const { useCreateCheckoutSessionMutation } = purchaseApi;