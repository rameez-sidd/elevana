import React from 'react'
import Header from '../components/shared/Header'
import Hero from '../components/Hero'
import LatestCourses from '../components/LatestCourses'

const Home = () => {
  return (
    <div className='bg-background-green'>
        <Header/>
        <Hero/>
        <LatestCourses/>
    </div>
  )
}

export default Home