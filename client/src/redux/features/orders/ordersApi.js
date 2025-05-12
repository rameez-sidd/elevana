import { apiSlice } from "../../api/apiSlice";
import { setUser } from '../auth/authSlice';

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (type) => ({
                url: 'get-orders',
                method: 'GET',
                credentials: 'include'
            })
        }),
        getStripePublishableKey: builder.query({
            query: () => ({
                url: 'payment/stripepublishablekey',
                method: 'GET',
                credentials: 'include'
            })
        }),
        createPaymentIntent: builder.mutation({
            query: ({ amount, courseId }) => ({
                url: 'payment',
                method: 'POST',
                body: { amount, courseId },
                credentials: 'include'
            })
        }),
        createOrder: builder.mutation({
            query: ({ courseId, paymentInfo }) => ({
                url: 'create-order',
                body: {
                    courseId,
                    paymentInfo,
                },
                method: 'POST',
                credentials: 'include'

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

export const { useGetAllOrdersQuery, useGetStripePublishableKeyQuery, useCreatePaymentIntentMutation, useCreateOrderMutation } = ordersApi;