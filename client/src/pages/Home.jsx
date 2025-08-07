import React, { use, useEffect, useState } from 'react'
import Header from '../components/shared/Header'
import Hero from '../components/Hero'
import LatestCourses from '../components/LatestCourses'
import StudentReviews from '../components/StudentReviews'
import FAQ from '../components/FAQ'
import Footer from '../components/shared/Footer'
import About from '../components/About'
import { useSelector } from 'react-redux'
import Intro from './Intro'
import useDocumentTitle from '../utils/useDocumentTitle'

const Home = () => {
  useDocumentTitle('Elevana | Where Knowledge Meets Elevation')
  const { user } = useSelector((state) => state.auth)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    // Check if intro has already been shown this session
    const hasIntroPlayed = sessionStorage.getItem('introPlayed')
    if (!hasIntroPlayed) {
      setShowIntro(true)
    }
  }, [])

  useEffect(() => {
    if (!showIntro) {
      // Mark that intro has played once
      sessionStorage.setItem('introPlayed', 'true')
      document.body.style.overflow = '' // enable scroll
    } else {
      document.body.style.overflow = 'hidden' // disable scroll while intro
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [showIntro])

  return (
    <div className='bg-background-green relative'>
      {/* {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      <div className={showIntro ? 'pointer-events-none' : 'pointer-events-auto'}>
        <Header />
        <Hero />
        {user && user.role === 'admin' ? null : <LatestCourses />}
        <About />
        <StudentReviews />
        <FAQ />
        <Footer />
      </div> */}
      <Intro/>
    </div>
  )
}

export default Home
