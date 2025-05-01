import React from 'react'
import Header from '../components/shared/Header'
import CoursesContainer from '../components/Courses/CoursesContainer'

const Courses = () => {
  return (
    <div className='bg-courses'>
        <Header/>
        <CoursesContainer/>
    </div>
  )
}

export default Courses