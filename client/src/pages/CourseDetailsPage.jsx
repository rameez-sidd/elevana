import Loading from '../components/Loading'
import CourseDetails from '../components/Courses/CourseDetails'
import Header from '../components/shared/Header'
import { useGetCourseDetailsQuery } from '../redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '../redux/features/orders/ordersApi'
import { loadStripe } from '@stripe/stripe-js'
import Footer from '../components/shared/Footer'
import { useSelector } from 'react-redux'
import useDocumentTitle from '../utils/useDocumentTitle'


const CourseDetailsPage = () => {
    const { id } = useParams()

    const { data, isLoading, refetch } = useGetCourseDetailsQuery(id, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true })

    useDocumentTitle(`Elevana | ${data?.course?.name}`)
    const { data: config } = useGetStripePublishableKeyQuery({})
    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState('')
    const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    console.log(data);
    
    useEffect(() => {
        if(user && user?.role === 'admin'){
            navigate('/')
        }
    }, [user])

    const [createPaymentIntent, { data: paymentIntentData}] = useCreatePaymentIntentMutation()

    useEffect(() => {
        refetch() 
    }, [])

   

    useEffect(() => {
        if (config) {
            const publishableKey = config?.publishableKey
            setStripePromise(loadStripe(publishableKey))
        }
        if (data && data?.course?.price > 0) {
            const amount = Math.round(data?.course?.priceUSD * 100)
            createPaymentIntent({ amount, courseId: data?.course?._id })
        }
    }, [config, data, user])

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
                    
                    stripePromise && <CourseDetails data={data?.course} stripePromise={stripePromise} clientSecret={clientSecret} refetch={refetch}/>
                    

                )
            }
            <Footer/>
        </div>
    )
}

export default CourseDetailsPage