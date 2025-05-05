import { useLoadUserQuery } from '@/redux/api/apiSlice'
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi'
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PaymentForm = ({ setOpenPayment, data }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState('')
    const [createOrder, { data: orderData, error }] = useCreateOrderMutation()
    const {user} = useSelector((state) => state.auth)
    const userMail = user?.email
    const [loadUser, setLoadUser] = useState(false)
    const { } = useLoadUserQuery({ skip: loadUser ? false : true })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",

        })
        if (error) {
            setMessage(error.message)
            setIsLoading(false)
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                await createOrder({ courseId: data._id, paymentInfo: paymentIntent }).unwrap()
                setLoadUser(true)
                navigate(`/course-access/${data._id}`)
                toast.success("Course purchased successfully!");
            } catch (error) {
                const message = error?.data?.message || error?.message || "Something went wrong.";
                toast.error(message);
            } finally {
                setIsLoading(false)
                setOpenPayment(false)

            }
        }
    }

    return (
        <div className='px-6 py-4'>
            <form id='payment-form' onSubmit={handleSubmit} className='flex flex-col gap-3 font-lexend '>
                <LinkAuthenticationElement id="link-authentication-element"
                // Access the email value like so:
                // onChange={(event) => {
                //  setEmail(event.value.email);
                // }}
                //
                // Prefill the email field like so:
                options={{defaultValues: {email: userMail || "",}}}
                />
                <PaymentElement id="payment-element" />
                <button disabled={isLoading || !stripe || !elements} id="submit" className={`bg-dark-green text-white py-2 rounded-md w-full ${isLoading || !stripe || !elements ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300" : "cursor-pointer"} hover:bg-dark-grass-green`}>
                    <span id="button-text" >
                        {isLoading ? "Paying..." : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message" className='text-xs text-red-600'>{message}</div>}
                    <p className='text-[10px] text-center text-gray-600'>Please do not refresh this page while your payment is being processed</p>
            </form>
        </div>
    )
}

export default PaymentForm