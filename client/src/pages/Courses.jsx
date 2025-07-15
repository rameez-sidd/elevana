import React from 'react'
import Header from '../components/shared/Header'
import CoursesContainer from '../components/Courses/CoursesContainer'
import Footer from '../components/shared/Footer'
import useDocumentTitle from '../utils/useDocumentTitle'

const Courses = () => {
  useDocumentTitle('Elevana | Courses')
  return (
    <div className='bg-background-green min-h-screen'>
        <Header/>
        <CoursesContainer/>
        <Footer/>
    </div>
  )
}

export default Courses