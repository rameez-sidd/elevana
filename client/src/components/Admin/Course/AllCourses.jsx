import React from 'react'
import CoursesDataGrid from './CoursesDataGrid'
import DashboardHeader from '../DashboardHeader'

const AllCourses = () => {
  return (
    <div className='flex flex-col h-screen'>
        <DashboardHeader title='All Courses'/>
        <div className='flex-1'>
            <CoursesDataGrid/>
        </div>
    </div>
  )
}

export default AllCourses