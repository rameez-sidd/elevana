import Loading from '../components/Loading'
import CourseDetails from '../components/Courses/CourseDetails'
import Header from '../components/shared/Header'
import { useGetCourseDetailsQuery } from '../redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '../redux/features/orders/ordersApi'
import { loadStripe } from '@stripe/stripe-js'

const CourseDetailsPage = () => {
    const { id } = useParams()

    const { data, isLoading, refetch } = useGetCourseDetailsQuery(id, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true })

    const { data: config } = useGetStripePublishableKeyQuery({})
    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState('')
    console.log(data);
    

    const [createPaymentIntent, { data: paymentIntentData}] = useCreatePaymentIntentMutation()

    useEffect(() => {
        refetch() 
    }, [])

    useEffect(() => {
        if (config) {
            const publishableKey = config?.publishableKey
            setStripePromise(loadStripe(publishableKey))
        }
        if (data) {
            const amount = Math.round(data?.course?.price * 100)
            createPaymentIntent(amount)
        }
    }, [config, data])

    useEffect(() => {
        if (paymentIntentData) {
            setClientSecret(paymentIntentData?.clientSecret)
        }
    }, [paymentIntentData])



    return (
        <div className='bg-background-green'>
            <Header />
            {
                isLoading ? (
                    <Loading size='screen' />
                ) : (
                    
                    stripePromise && <CourseDetails data={data?.course} stripePromise={stripePromise} clientSecret={clientSecret}/>
                    

                )
            }
        </div>
    )
}

export default CourseDetailsPage