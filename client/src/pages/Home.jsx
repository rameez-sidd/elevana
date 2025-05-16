import React from 'react'
import Header from '../components/shared/Header'
import Hero from '../components/Hero'
import LatestCourses from '../components/LatestCourses'
import StudentReviews from '../components/StudentReviews'
import FAQ from '../components/FAQ'
import Footer from '../components/shared/Footer'
import About from '../components/About'
import { useSelector } from 'react-redux'


const Home = () => {
  const {user} = useSelector((state) => state.auth)
  

  return (
    <div className='bg-background-green'>
        <Header/>
        <Hero/>
        {
          user && user?.role === 'admin' ? ( <></> ) : (

            <LatestCourses/>
          )
        }
        <About/>
        <StudentReviews/>
        <FAQ/>
        <Footer/>
    </div>
  )
}

export default Home