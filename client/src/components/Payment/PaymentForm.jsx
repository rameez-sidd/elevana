import { useLoadUserQuery } from '@/redux/api/apiSlice'
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi'
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import socketIO from 'socket.io-client'
import { IoArrowBackCircleSharp } from 'react-icons/io5'

const ENDPOINT = import.meta.env.VITE_PUBLIC_SOCKET_SERVER_URI || ""
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })


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
        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
                confirmParams: {
                    return_url: `${window.location.origin}/course-access/${data._id}`,
                }
            })

            if (error) {
                setMessage(error.message)
                setIsLoading(false)
                return
            }

            if (paymentIntent && paymentIntent.status === "succeeded") {
                try {
                    await createOrder({ courseId: data._id, paymentInfo: paymentIntent }).unwrap()
                    setLoadUser(true)
                    navigate(`/course-access/${data._id}`)
                    toast.success("Course purchased successfully!");

                    socketId.emit("notification", {
                        adminId: data?.course?.createdBy,
                        notification: {
                            title: 'New Order',
                            message: `You have a new order from ${data?.course?.name}`,
                            userId: user?._id
                        }
                    })
                } catch (error) {
                    const message = error?.data?.message || error?.message || "Something went wrong.";
                    toast.error(message);
                }
            } else {
                setMessage("Payment processing. Please wait...");
            }
        } catch (error) {
            setMessage(`${error}: An unexpected error occurred.`);
        } finally {
            setIsLoading(false)
            setOpenPayment(false)
        }
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='flex-1 flex flex-col gap-3 p-3 lg:p-4 xl:p-6 md:pb-4 '>
                <div className='flex items-center gap-2'>
                    <IoArrowBackCircleSharp size={32} className='cursor-pointer hover:text-gray-600' onClick={() => setOpenPayment(false)}/>
                    <h3 className='font-plaster text-lg text-grass-green'>Elevana</h3>
                </div>
                <div className='flex flex-col mt-1'>
                    <p className='text-[15px] text-gray-600'>Pay Elevana</p>
                    <p className='text-3xl xl:text-4xl font-[500]'>₹{data?.price}.00</p>
                </div>
                <div className='flex flex-col gap-1 mb-4 md:mb-20'>
                    <div className='rounded-sm flex '>
                        <img src={data?.thumbnail?.url}  alt="" className='rounded-sm '/>
                    </div>
                    <p className='text-xl/6 lg:text-2xl font-[600]'>{data?.name}</p>
                </div>
                
            </div>
            <form id='payment-form' onSubmit={handleSubmit} className='flex flex-col justify-center gap-3 font-lexend flex-1 px-3 py-4 lg:px-4.5 xl:p-6 xl:px-8 border-t md:border-t-0 md:border-l border-gray-300'>
                <LinkAuthenticationElement id="link-authentication-element"
                // Access the email value like so:
                // onChange={(event) => {
                //  setEmail(event.value.email);
                // }}
                //
                // Prefill the email field like so:
                options={{defaultValues: {email: userMail || "",}}}
                />
                <PaymentElement id="payment-element" className=''/>
                <button disabled={isLoading || !stripe || !elements} id="submit" className={`bg-dark-green text-white py-2 rounded-md w-full ${isLoading || !stripe || !elements ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300" : "cursor-pointer"} hover:bg-dark-grass-green`}>
                    <span id="button-text" >
                        {isLoading ? "Please Wait..." : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message" className='text-xs text-center text-red-600'>{message}</div>}
                    <p className='text-[10px] text-center text-gray-600'>Please do not refresh this page while your payment is being processed</p>
            </form>
        </div>
    )
}

export default PaymentForm